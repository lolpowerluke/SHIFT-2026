import db from "../config/db.js";

const getUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
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
      WHERE u.id = ?`,
      [userId]
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
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userRole !== "3rdyear" && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Only 3rdyear students can edit their profile" });
    }

    const { firstname, lastname, mediaIds, socials } = req.body;

    const fields = [];
    const values = [];
    if (firstname !== undefined) { fields.push("firstname = ?"); values.push(firstname); }
    if (lastname !== undefined) { fields.push("lastname = ?"); values.push(lastname); }

    if (fields.length) {
      await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, [...values, userId]);
    }

    if (mediaIds !== undefined) {
      await db.query("DELETE FROM media_user WHERE user = ?", [userId]);
      if (Array.isArray(mediaIds) && mediaIds.length) {
        const rows = mediaIds.map((mid) => [userId, mid]);
        await db.query("INSERT INTO media_user (user, media) VALUES ?", [rows]);
      }
    }

    if (socials !== undefined) {
      await db.query("DELETE FROM socials WHERE user = ?", [userId]);
      if (Array.isArray(socials) && socials.length) {
        const rows = socials.map((s) => [userId, s]);
        await db.query("INSERT INTO socials (user, social) VALUES ?", [rows]);
      }
    }

    res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error(" error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};

export { getUser, updateUser };
