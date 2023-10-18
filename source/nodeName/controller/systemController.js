const storage = require("../utils/storage");

module.exports = {
  health: (req, res) => {
    res.json({ status: "UP" });
  },

  getCurrentHashMap: (req, res) => {
    const storageMap = storage.getEntireMap();
    res.json(storageMap);
  },

  ls: (req, res) => {
    try {
      const allFiles = storage.getAllFiles();
      res.json(allFiles);
    } catch (error) {
      console.error("Error en el ls", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  },
  getAllFiles: (req, res) => {
    try {
      const allFiles = storage.getAllFiles();
      res.json(allFiles);
    } catch (error) {
      console.error("Error in getAllFiles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
