const storage = require("../utils/storage");

module.exports = {
  health: (req, res) => {
    res.json({ status: "UP" });
  },

  hashmap: (req, res) => {
    res.json(storage.getEntireMap());
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
};
