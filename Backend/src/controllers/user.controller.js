import db from "../config/db.js";
import { uploadFile } from "../utils/cloudinary.js";

const getUser = async (req, res) => {
  try {
    const requesterId = req.user?.id;
    const userRole = req.user?.role;

    if (!requesterId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    let whereClause = "u.id = ?";
    let whereValue;

    if (req.query.email) {
      whereClause = "u.email = ?";
      whereValue = req.query.email;
    } else {
      whereValue = req.query.id ? Number(req.query.id) : requesterId;
    }

    const [rows] = await db.query(
      `SELECT
        u.id, u.firstname, u.lastname, u.email, u.role,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', m.id, 'url', m.url))
          FROM media m
          JOIN media_user mu ON mu.media = m.id
          WHERE mu.user = u.id
        ) AS images,
        (
          SELECT JSON_ARRAYAGG(s.social)
          FROM socials s
          WHERE s.user = u.id
        ) AS socials
      FROM users u
      WHERE ${whereClause}`,
      [whereValue]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: rows[0] });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to get user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const requesterId = req.user?.id;
    const userRole = req.user?.role;

    if (!requesterId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Only 3rdyear students can edit their profile" });
    }

    const userId = req.query.id ? Number(req.query.id) : requesterId;

    const { firstname, lastname, socials } = req.body;
    const imageFile = req.file ?? null;

    const fields = [];
    const values = [];
    if (firstname !== undefined) { fields.push("firstname = ?"); values.push(firstname); }
    if (lastname !== undefined) { fields.push("lastname = ?"); values.push(lastname); }

    if (fields.length) {
      await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, [...values, userId]);
    }

    if (imageFile) {
      await db.query(
        `DELETE FROM media WHERE id IN (SELECT media FROM media_user WHERE user = ?)`,
        [userId]
      );
      await db.query("DELETE FROM media_user WHERE user = ?", [userId]);

      const { url } = await uploadFile(imageFile.buffer);
      const [{ insertId }] = await db.query("INSERT INTO media (url) VALUES (?)", [url]);
      await db.query("INSERT INTO media_user (user, media) VALUES (?, ?)", [userId, insertId]);
    }

    if (socials) {
      await db.query("DELETE FROM socials WHERE user = ?", [userId]);
      await db.query("INSERT INTO socials (user, social) VALUES (?, ?)", [userId, socials]);
    }

    res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};

export { getUser, updateUser };
