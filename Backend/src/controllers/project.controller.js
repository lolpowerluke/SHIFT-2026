import db from "../config/db.js";

const PROJECT_QUERY = `SELECT
        p.id,
        p.name,
        p.description,
        p.course,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'url', i.url))
          FROM (SELECT DISTINCT img.id, img.url FROM images img
                JOIN image_project ip2 ON ip2.image = img.id
                WHERE ip2.project = p.id) i
        ) AS images,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT(
            'id', u2.id,
            'email', u2.email,
            'role', u2.role,
            'picture', u2.picture,
            'socials', u2.socials
          ))
          FROM (
            SELECT DISTINCT
              u3.id, u3.email, u3.role,
              (SELECT img2.url FROM images img2
               JOIN image_user iu ON iu.image = img2.id
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
    res.status(200).json({
      success: true,
      projects: result,
    });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(PROJECT_QUERY + ` WHERE p.id = ?;`, [id]);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} doesnt exist`,
      });
    }
    res.status(200).json({
      success: true,
      project: result[0],
    });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get project info",
      error: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      course,
      memberIds = [],
      imageIds = [],
    } = req.body;

    if (!name || !description || !course || memberIds.length === 0) {
      return res.status(412).json({
        success: false,
        message: "Body incomplete",
      });
    }

    const [{ insertId }] = await db.query(
      "INSERT INTO projects (name, description, course) VALUES (?, ?, ?)",
      [name, description, course],
    );

    if (memberIds.length) {
      const memberRows = memberIds.map((uid) => [uid, insertId]);
      await db.query("INSERT INTO project_user (user, project) VALUES ?", [
        memberRows,
      ]);
    }

    if (imageIds.length) {
      const imageRows = imageIds.map((iid) => [insertId, iid]);
      await db.query("INSERT INTO image_project (project, image) VALUES ?", [
        imageRows,
      ]);
    }

    res.status(201).json({
      success: true,
      projectId: insertId,
    });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, course, memberIds, imageIds } = req.body;

    const [existing] = await db.query("SELECT id FROM projects WHERE id = ?", [id]);
    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: `Project ${id} doesn't exist`,
      });
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
    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if (course) {
      fields.push("course = ?");
      values.push(course);
    }

    if (fields.length) {
      await db.query(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, [
        ...values,
        id,
      ]);
    }

    if (memberIds) {
      await db.query("DELETE FROM project_user WHERE project = ?", [id]);
      if (memberIds.length) {
        const rows = memberIds.map((uid) => [uid, id]);
        await db.query("INSERT INTO project_user (user, project) VALUES ?", [
          rows,
        ]);
      }
    }

    if (imageIds) {
      await db.query("DELETE FROM image_project WHERE project = ?", [id]);
      if (imageIds.length) {
        const rows = imageIds.map((iid) => [id, iid]);
        await db.query("INSERT INTO image_project (project, image) VALUES ?", [
          rows,
        ]);
      }
    }

    res.status(200).json({ success: true, message: "Project updated" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
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
      `
      DELETE FROM images WHERE id IN (
        SELECT image FROM image_project WHERE project = ?
      )
    `,
      [id],
    );

    await db.query("DELETE FROM projects WHERE id = ?", [id]);

    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

export {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
