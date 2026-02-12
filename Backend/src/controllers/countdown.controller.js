import db from "../config/db.js";

const getCountDown = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM countdown"
    )
    let tempDateArray = [];
    const date = new Date();
    for(const i of result) {
      const tempDate = i.date;
      if (tempDate.getTime() > date.getTime()) {
        tempDateArray.push(i);
      }
    }
    let earliest = null;
    if (tempDateArray.length > 0) {
      earliest = tempDateArray.reduce((prev, current) => {
        return prev.date.getTime() < current.date.getTime() ? prev : current;
      });
    } else {
      return res.status(400).json({ message: "No future countdowns" })
    }
    return res.status(200).json(earliest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" })
  }
}

export {
  getCountDown
}
