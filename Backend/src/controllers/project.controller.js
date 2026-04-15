import db from "../config/db.js";

const getAllProjects = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT
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
      FROM projects p
      GROUP BY p.id, p.name, p.description, p.course;`
    );
    res.status(200).json({
      success: true,
      projects: result
    });
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message
    });
  }
}

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      `SELECT
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
      FROM projects p
      WHERE p.id = ?;`,
      [id]
    )
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} doesnt exist`
      })
    }
    res.send(result);
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get project info",
      error: error.message
    });
  }
}

const createProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
}

const updateProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
}

const deleteProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
}

export {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
}
