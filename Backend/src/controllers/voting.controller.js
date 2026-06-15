import db from "../config/db.js";
import crypto from 'crypto';

const getAllVotes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.name, COUNT(v.id) AS vote_count
      FROM projects p
      LEFT JOIN votes v ON v.project = p.id
      GROUP BY p.id, p.name
      ORDER BY vote_count DESC
    `)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getVotenFromToken = async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ error: 'token required' })
  }

  try {
    const [rows] = await db.query(
      `SELECT project FROM votes WHERE token = ?`,
      [token]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'invalid token' })
    }

    // project is null if token exists but hasn't voted yet
    res.json({ project: rows[0].project })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const vote = async (req, res) => {
  const { token, project } = req.body

  if (!token || !project) {
    return res.status(400).json({ error: 'token and project required' })
  }

  try {
    // Check token exists and hasn't voted yet
    const [rows] = await db.query(
      `SELECT id, project FROM votes WHERE token = ?`,
      [token]
    )

    if (rows.length === 0) {
      return res.status(403).json({ error: 'invalid token' })
    }

    if (rows[0].project !== null) {
      return res.status(409).json({ error: 'token already used' })
    }

    // Assign the vote
    await db.query(
      `UPDATE votes SET project = ? WHERE token = ?`,
      [project, token]
    )

    res.json({ success: true })
  } catch (err) {
    // FK violation = project doesn't exist
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ error: 'project not found' })
    }
    res.status(500).json({ error: err.message })
  }
}

const token = async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString('hex') // 64 char hex
    // Insert placeholder row with no project yet — reserves the token
    await db.query(
      `INSERT INTO votes (token, project) VALUES (?, NULL)`,
      [token]
    )
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllVotes, vote, getVotenFromToken, token };
