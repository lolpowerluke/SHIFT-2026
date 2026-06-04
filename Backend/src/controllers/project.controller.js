import db from "../config/db.js";
import { uploadFile } from "../utils/cloudinary.js";

const PROJECT_QUERY = `
      SELECT
        p.id,
        p.name,
        p.description,
        p.course,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'url', i.url))
          FROM (SELECT DISTINCT img.id, img.url FROM media img
                JOIN media_project ip2 ON ip2.media = img.id
                WHERE ip2.project = p.id AND ip2.type = 'image') i
        ) AS media,
        (
          SELECT JSON_OBJECT('id', mg.id, 'url', mg.url)
          FROM media mg
          JOIN media_project mp3 ON mp3.media = mg.id
          WHERE mp3.project = p.id AND mp3.type = 'magazine'
          LIMIT 1
        ) AS magazine,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT(
            'id', u2.id,
            'firstname', u2.firstname,
            'lastname', u2.lastname,
            'email', u2.email,
            'role', u2.role,
            'picture', u2.picture,
            'socials', u2.socials
          ))
          FROM (
            SELECT DISTINCT
              u3.id, u3.firstname, u3.lastname, u3.email, u3.role,
              (SELECT img2.url FROM media img2
               JOIN media_user iu ON iu.media = img2.id
               WHERE iu.user = u3.id LIMIT 1) AS picture,
              (SELECT JSON_ARRAYAGG(s.social) FROM socials s
               WHERE s.user = u3.id) AS socials
            FROM users u3
            JOIN project_user pu2 ON pu2.user = u3.id
            WHERE pu2.project = p.id
          ) u2
        ) AS members
      FROM projects p`;

const getAllProjects = async (req, res) => {
  try {
    const [result] = await db.query(
      PROJECT_QUERY + ` GROUP BY p.id, p.name, p.description, p.course;`,
    );
    res.status(200).json({ success: true, projects: result });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get projects", error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(PROJECT_QUERY + ` WHERE p.id = ?;`, [id]);
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: `Project with ID ${id} doesnt exist` });
    }
    res.status(200).json({ success: true, project: result[0] });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get project info", error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, course, memberIds = [] } = req.body;
    const files = req.files?.files ?? [];
    const [magazineFile] = req.files?.magazine ?? [];

    if (!name || !description || !course || memberIds.length === 0) {
      return res.status(412).json({ success: false, message: "Body incomplete" });
    }

    const [{ insertId }] = await db.query(
      "INSERT INTO projects (name, description, course) VALUES (?, ?, ?)",
      [name, description, course],
    );

    if (memberIds.length) {
      const memberRows = memberIds.map((uid) => [uid, insertId]);
      await db.query("INSERT INTO project_user (user, project) VALUES ?", [memberRows]);
    }

    if (files.length) {
      const uploads = await Promise.all(files.map((f) => uploadFile(f.buffer)));
      const mediaInserts = await Promise.all(
        uploads.map(({ url }) =>
          db.query("INSERT INTO media (url) VALUES (?)", [url]).then(([r]) => r.insertId)
        )
      );
      const mediaRows = mediaInserts.map((mid) => [insertId, mid, 'image']);
      await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [mediaRows]);
    }

    if (magazineFile) {
      const { url } = await uploadFile(magazineFile.buffer, { resource_type: "raw" });
      const [[{ insertId: mediaId }]] = await db.query("INSERT INTO media (url) VALUES (?)", [url]);
      await db.query("INSERT INTO media_project (project, media, type) VALUES (?, ?, 'magazine')", [insertId, mediaId]);
    }

    res.status(201).json({ success: true, projectId: insertId });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to create project", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, course, memberIds } = req.body;
    const files = req.files?.files ?? [];
    const [magazineFile] = req.files?.magazine ?? [];

    const [existing] = await db.query("SELECT id FROM projects WHERE id = ?", [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: `Project ${id} doesn't exist` });
    }

    const [membership] = await db.query(
      "SELECT id FROM project_user WHERE project = ? AND user = ?",
      [id, req.user.id]
    );
    if (!membership.length) {
      return res.status(403).json({ success: false, message: "Not a project owner" });
    }

    const fields = [];
    const values = [];
    if (name) { fields.push("name = ?"); values.push(name); }
    if (description) { fields.push("description = ?"); values.push(description); }
    if (course) { fields.push("course = ?"); values.push(course); }

    if (fields.length) {
      await db.query(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    }

    if (memberIds) {
      await db.query("DELETE FROM project_user WHERE project = ?", [id]);
      if (memberIds.length) {
        const rows = memberIds.map((uid) => [uid, id]);
        await db.query("INSERT INTO project_user (user, project) VALUES ?", [rows]);
      }
    }

    if (files.length) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'image')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'image'", [id]);

      const uploads = await Promise.all(files.map((f) => uploadFile(f.buffer)));
      const mediaInserts = await Promise.all(
        uploads.map(({ url }) =>
          db.query("INSERT INTO media (url) VALUES (?)", [url]).then(([r]) => r.insertId)
        )
      );
      const mediaRows = mediaInserts.map((mid) => [id, mid, 'image']);
      await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [mediaRows]);
    }

    if (magazineFile) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'magazine')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'magazine'", [id]);

      const { url } = await uploadFile(magazineFile.buffer, { resource_type: "raw" });
      const [[{ insertId: mediaId }]] = await db.query("INSERT INTO media (url) VALUES (?)", [url]);
      await db.query("INSERT INTO media_project (project, media, type) VALUES (?, ?, 'magazine')", [id, mediaId]);
    }

    res.status(200).json({ success: true, message: "Project updated" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to update project", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query("SELECT id FROM projects WHERE id = ?", [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: `Project ${id} doesn't exist` });
    }

    const [membership] = await db.query(
      "SELECT id FROM project_user WHERE project = ? AND user = ?",
      [id, req.user.id]
    );
    if (!membership.length) {
      return res.status(403).json({ success: false, message: "Not a project owner" });
    }

    await db.query(
      `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ?)`,
      [id],
    );

    await db.query("DELETE FROM projects WHERE id = ?", [id]);

    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to delete project", error: error.message });
  }
};

export { getAllProjects, getProject, createProject, updateProject, deleteProject };
