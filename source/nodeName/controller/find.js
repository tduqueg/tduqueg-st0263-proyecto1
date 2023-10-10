const storage = require("../utils/storage");

module.exports = {
  find: async (req, res) => {
    try {
      const fileName = req.query.fileName;

      if (!fileName) {
        return res
          .status(400)
          .json({ message: "El nombre del archivo es necesario" });
      }

      const storageNodeIps = storage.find(fileName);

      res.json({
        ips: storageNodeIps,
      });
    } catch (error) {
      console.error("Error en la busqueda", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  },
};
