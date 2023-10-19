const req = require("express/lib/request");
const storage = require("../utils/storage");

module.exports = {
  create: (req, res) => {
    try {
      const fileName = req.query.fileName;
      const storageMap = req.storageMap;

      if (storage.exists(fileName)) {
        return res.status(400).json({ message: "El archivo ya existe" });
      }

      const config = req.config;
      const storageNodes = config.storageNodes;

      if (storageNodes.lenght === 0) {
        return res
          .status(500)
          .json({ message: "No hay nodos de almacenamiento" });
      }

      const randomIndex =
        Math.floor(Math.random() * (storageNodes.lenght - 1)) + 1;
      const randomSecondaryIndex =
        Math.floor(Math.random() * (storageNodes.lenght - 1)) + 1;
      const randomIp = storageNodes[randomIndex];
      const randomSecondaryIp = storageNodes[randomSecondaryIndex];

      res.json({ ip: [randomIp, randomSecondaryIp] });
    } catch (error) {
      console.error("Error en la creacion", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  },

  update: (req, res) => {
    try {
      const fileName = req.query.fileName;
      const storageMap = req.storageMap;
      const storageNodeIps = storage.find(fileName);
      res.json({ ip: storageNodeIps });
    } catch (error) {
      console.error("Error en la actualizacion", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  },
};
