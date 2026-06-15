import db from "../config/db.js";
import { uploadFile } from "../utils/cloudinary.js";

const IMAGE_SIZE_LIMIT = 2 * 1024 * 1024;    // 2MB
const MAGAZINE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

function validateFileSizes(files = [], magazineFile = null) {
  for (const f of files) {
    if (f.size > IMAGE_SIZE_LIMIT) {
      return `Image "${f.originalname}" exceeds the 2MB limit (${(f.size / 1024 / 1024).toFixed(2)}MB)`;
    }
  }
  if (magazineFile && magazineFile.size > MAGAZINE_SIZE_LIMIT) {
    return `Magazine "${magazineFile.originalname}" exceeds the 10MB limit (${(magazineFile.size / 1024 / 1024).toFixed(2)}MB)`;
  }
  return null;
}

async function safeUploadImages(files) {
  const results = await Promise.allSettled(files.map((f) => uploadFile(f.buffer)));
  const uploaded = [];
  const warnings = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      uploaded.push(r.value);
    } else {
      console.error("Cloudinary image upload failed:", r.reason);
      warnings.push(`Image "${files[i].originalname}" failed to upload: ${r.reason?.message ?? "unknown error"}`);
    }
  });
  return { uploaded, warnings };
}

async function safeUploadMagazine(magazineFile) {
  try {
    const result = await uploadFile(magazineFile.buffer, { resource_type: "raw" });
    return { ...result, warning: null };
  } catch (err) {
    console.error("Cloudinary magazine upload failed:", err);
    return { cloudName: null, path: null, warning: `Magazine "${magazineFile.originalname}" failed to upload: ${err?.message ?? "unknown error"}` };
  }
}

const getAllProjects = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT
        p.id,
        p.name,
        p.course,
        (
          SELECT JSON_OBJECT('id', i.id, 'cloud_name', i.cloud_name, 'path', i.path)
          FROM media i
          JOIN media_project ip2 ON ip2.media = i.id
          WHERE ip2.project = p.id AND ip2.type = 'image'
          LIMIT 1
        ) AS image,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT(
            'id', u2.id,
            'firstname', u2.firstname,
            'lastname', u2.lastname,
            'picture', u2.picture
          ))
          FROM (
            SELECT DISTINCT
              u3.id, u3.firstname, u3.lastname,
              (SELECT JSON_OBJECT('cloud_name', img2.cloud_name, 'path', img2.path) FROM media img2
               JOIN media_user iu ON iu.media = img2.id
               WHERE iu.user = u3.id LIMIT 1) AS picture
            FROM users u3
            JOIN project_user pu2 ON pu2.user = u3.id
            WHERE pu2.project = p.id
          ) u2
        ) AS members
      FROM projects p
      GROUP BY p.id, p.name, p.course;`,
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
    const [result] = await db.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.course,
        p.promoter,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'cloud_name', i.cloud_name, 'path', i.path))
          FROM (SELECT DISTINCT img.id, img.cloud_name, img.path FROM media img
                JOIN media_project ip2 ON ip2.media = img.id
                WHERE ip2.project = p.id AND ip2.type = 'image') i
        ) AS media,
        (
          SELECT JSON_OBJECT('id', mg.id, 'cloud_name', mg.cloud_name, 'path', mg.path)
          FROM media mg
          JOIN media_project mp3 ON mp3.media = mg.id
          WHERE mp3.project = p.id AND mp3.type = 'magazine'
          LIMIT 1
        ) AS magazine,
        (
          SELECT JSON_OBJECT('id', mv.id, 'cloud_name', mv.cloud_name, 'path', mv.path)
          FROM media mv
          JOIN media_project mp4 ON mp4.media = mv.id
          WHERE mp4.project = p.id AND mp4.type = 'video'
          LIMIT 1
        ) AS video,
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
              (SELECT JSON_OBJECT('cloud_name', img2.cloud_name, 'path', img2.path) FROM media img2
               JOIN media_user iu ON iu.media = img2.id
               WHERE iu.user = u3.id LIMIT 1) AS picture,
              (SELECT JSON_ARRAYAGG(s.social) FROM socials s
               WHERE s.user = u3.id) AS socials
            FROM users u3
            JOIN project_user pu2 ON pu2.user = u3.id
            WHERE pu2.project = p.id
          ) u2
        ) AS members
      FROM projects p
      WHERE p.id = ?;`, [id]);
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: `Project with ID ${id} doesnt exist` });
    }
    res.status(200).json({ success: true, project: result[0] });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get project info", error: error.message });
  }
};

const getRandomProjects = async (req, res) => {
  try {
    const { count } = req.params;
    const [result] = await db.query(
      `SELECT
        p.id,
        p.name,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'cloud_name', i.cloud_name, 'path', i.path))
          FROM (
            SELECT DISTINCT img.id, img.cloud_name, img.path
            FROM media img
            JOIN media_project ip2 ON ip2.media = img.id
            WHERE ip2.project = p.id AND ip2.type = 'image'
          ) i
        ) AS media,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('firstname', u2.firstname, 'lastname', u2.lastname))
          FROM (
            SELECT DISTINCT u3.firstname, u3.lastname
            FROM users u3
            JOIN project_user pu2 ON pu2.user = u3.id
            WHERE pu2.project = p.id
            LIMIT 2
          ) u2
        ) AS members
      FROM projects p
      ORDER BY RAND()
      LIMIT ?`,
      [parseInt(count)]
    );

    res.status(200).json({ success: true, projects: result });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ success: false, message: "Failed to get random projects", error: error.message });
  }
};

const getAllProjectsAdmin = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.course,
        p.promoter,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'cloud_name', i.cloud_name, 'path', i.path))
          FROM (SELECT DISTINCT img.id, img.cloud_name, img.path FROM media img
                JOIN media_project ip2 ON ip2.media = img.id
                WHERE ip2.project = p.id AND ip2.type = 'image') i
        ) AS media,
        (
          SELECT JSON_OBJECT('id', mg.id, 'cloud_name', mg.cloud_name, 'path', mg.path)
          FROM media mg
          JOIN media_project mp3 ON mp3.media = mg.id
          WHERE mp3.project = p.id AND mp3.type = 'magazine'
          LIMIT 1
        ) AS magazine,
        (
          SELECT JSON_OBJECT('id', mv.id, 'cloud_name', mv.cloud_name, 'path', mv.path)
          FROM media mv
          JOIN media_project mp4 ON mp4.media = mv.id
          WHERE mp4.project = p.id AND mp4.type = 'video'
          LIMIT 1
        ) AS video,
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
              (SELECT JSON_OBJECT('cloud_name', img2.cloud_name, 'path', img2.path) FROM media img2
               JOIN media_user iu ON iu.media = img2.id
               WHERE iu.user = u3.id LIMIT 1) AS picture,
              (SELECT JSON_ARRAYAGG(s.social) FROM socials s
               WHERE s.user = u3.id) AS socials
            FROM users u3
            JOIN project_user pu2 ON pu2.user = u3.id
            WHERE pu2.project = p.id
          ) u2
        ) AS members
      FROM projects p
      GROUP BY p.id, p.name, p.course;`,
    );
    res.status(200).json({ success: true, projects: result });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get projects", error: error.message });
  }
};

const getProjectCount = async (req, res) => {
  try {
    const result = await db.query(`SELECT COUNT(*) as count FROM projects;`);
    const count = result[0][0].count;
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get project count", error: error.message });
  }
};

const getAllMediaByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (type !== 'image' && type !== 'video' && type !== 'magazine') {
      return res.status(404).json({ success: false, message: `Type ${type} doesnt exist!` })
    }
    const [media] = await db.query(
      `SELECT m.id, m.cloud_name, m.path, mp.type, mp.project
       FROM media_project mp
       JOIN media m ON m.id = mp.media
       WHERE mp.type = ?`,
      [type]
    );
    res.status(200).json({ success: true, media });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ success: false, message: "Failed to get media by type", error: error.message });
  }
}

const createProject = async (req, res) => {
  try {
    const { name, description, course, promoter, memberIds = [], videoURL } = req.body;
    const files = req.files?.files ?? [];
    const [magazineFile] = req.files?.magazine ?? [];

    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Only 3rdyear students can create a project" });
    }

    if (!name || !description || !course || !promoter || memberIds.length === 0) {
      return res.status(412).json({ success: false, message: "Body incomplete" });
    }

    const sizeError = validateFileSizes(files, magazineFile);
    if (sizeError) {
      return res.status(413).json({ success: false, message: sizeError });
    }

    const warnings = [];

    const [{ insertId }] = await db.query(
      "INSERT INTO projects (name, description, course, promoter) VALUES (?, ?, ?, ?)",
      [name, description, course, promoter],
    );

    if (memberIds.length) {
      const memberRows = JSON.parse(memberIds).map(uid => [uid, insertId]);
      await db.query("INSERT INTO project_user (user, project) VALUES ?", [memberRows]);
    }

    if (files.length) {
      const { uploaded, warnings: imgWarnings } = await safeUploadImages(files);
      warnings.push(...imgWarnings);
      if (uploaded.length) {
        const mediaInserts = await Promise.all(
          uploaded.map(({ cloudName, path }) =>
            db.query("INSERT INTO media (cloud_name, path) VALUES (?, ?)", [cloudName, path]).then(([r]) => r.insertId)
          )
        );
        const mediaRows = mediaInserts.map((mid) => [insertId, mid, 'image']);
        await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [mediaRows]);
      }
    }

    if (magazineFile) {
      const { cloudName, path, warning } = await safeUploadMagazine(magazineFile);
      if (warning) {
        warnings.push(warning);
      } else {
        const [{ insertId: mediaId }] = await db.query("INSERT INTO media (cloud_name, path) VALUES (?, ?)", [cloudName, path]);
        await db.query("INSERT INTO media_project (project, media, type) VALUES (?, ?, 'magazine')", [insertId, mediaId]);
      }
    }

    if (videoURL) {
      // Videos are external URLs (e.g. YouTube/Vimeo) — store with empty cloud_name
      const [r] = await db.query("INSERT INTO media (cloud_name, path) VALUES ('', ?)", [videoURL]);
      await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [[[insertId, r.insertId, 'video']]]);
    }

    res.status(201).json({
      success: true,
      projectId: insertId,
      ...(warnings.length && { warnings }),
    });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to create project", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { name, description, course, promoter, videoURL, memberIds,
      imageURL, magazineURL } = req.body;
    const files = req.files?.files ?? [];
    const [magazineFile] = req.files?.magazine ?? [];

    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Only 3rdyear students can edit a project" });
    }

    const [existing] = await db.query("SELECT id FROM projects WHERE id = ?", [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: `Project ${id} doesn't exist` });
    }

    if (userRole !== "admin") {
      const [membership] = await db.query(
        "SELECT id FROM project_user WHERE project = ? AND user = ?",
        [id, userId]
      );
      if (!membership.length) {
        return res.status(403).json({ success: false, message: "Not a project owner" });
      }
    }

    const sizeError = validateFileSizes(files, magazineFile);
    if (sizeError) {
      return res.status(413).json({ success: false, message: sizeError });
    }

    const warnings = [];

    const fields = [];
    const values = [];
    if (name) { fields.push("name = ?"); values.push(name); }
    if (description) { fields.push("description = ?"); values.push(description); }
    if (course) { fields.push("course = ?"); values.push(course); }
    if (promoter) { fields.push("promoter = ?"); values.push(promoter); }

    if (fields.length) {
      await db.query(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    }

    if (memberIds) {
      await db.query("DELETE FROM project_user WHERE project = ?", [id]);
      if (memberIds.length) {
        const rows = JSON.parse(memberIds).map(uid => [uid, id]);
        await db.query("INSERT INTO project_user (user, project) VALUES ?", [rows]);
      }
    }

    if (videoURL !== undefined) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'video')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'video'", [id]);

      if (videoURL) {
        const [r] = await db.query("INSERT INTO media (cloud_name, path) VALUES ('', ?)", [videoURL]);
        await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [[[id, r.insertId, 'video']]]);
      }
    }

    if (files.length) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'image')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'image'", [id]);

      const { uploaded, warnings: imgWarnings } = await safeUploadImages(files);
      warnings.push(...imgWarnings);
      if (uploaded.length) {
        const mediaInserts = await Promise.all(
          uploaded.map(({ cloudName, path }) =>
            db.query("INSERT INTO media (cloud_name, path) VALUES (?, ?)", [cloudName, path]).then(([r]) => r.insertId)
          )
        );
        const mediaRows = mediaInserts.map((mid) => [id, mid, 'image']);
        await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [mediaRows]);
      }
    } else if (imageURL === "") {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'image')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'image'", [id]);
    } else if (imageURL) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'image')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'image'", [id]);

      // imageURL is a full external URL — store with empty cloud_name
      const [r] = await db.query("INSERT INTO media (cloud_name, path) VALUES ('', ?)", [imageURL]);
      await db.query("INSERT INTO media_project (project, media, type) VALUES ?", [[[id, r.insertId, 'image']]]);
    }

    if (magazineFile) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'magazine')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'magazine'", [id]);

      const { cloudName, path, warning } = await safeUploadMagazine(magazineFile);
      if (warning) {
        warnings.push(warning);
      } else {
        const [{ insertId: mediaId }] = await db.query("INSERT INTO media (cloud_name, path) VALUES (?, ?)", [cloudName, path]);
        await db.query("INSERT INTO media_project (project, media, type) VALUES (?, ?, 'magazine')", [id, mediaId]);
      }
    } else if (magazineURL === "") {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'magazine')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'magazine'", [id]);
    } else if (magazineURL) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_project WHERE project = ? AND type = 'magazine')`,
        [id]
      );
      await db.query("DELETE FROM media_project WHERE project = ? AND type = 'magazine'", [id]);

      const [r] = await db.query("INSERT INTO media (cloud_name, path) VALUES ('', ?)", [magazineURL]);
      await db.query("INSERT INTO media_project (project, media, type) VALUES (?, ?, 'magazine')", [id, r.insertId]);
    }

    res.status(200).json({
      success: true,
      message: "Project updated",
      ...(warnings.length && { warnings }),
    });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to update project", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Only 3rdyear students can delete a project" });
    }

    const [existing] = await db.query("SELECT id FROM projects WHERE id = ?", [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: `Project ${id} doesn't exist` });
    }

    const [membership] = await db.query(
      "SELECT id FROM project_user WHERE project = ? AND user = ?",
      [id, req.user.id]
    );
    if (!membership.length && userRole !== "admin") {
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

export { getAllProjects, getAllProjectsAdmin, getProject, getRandomProjects, getProjectCount, getAllMediaByType, createProject, updateProject, deleteProject };
