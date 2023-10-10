const fileSystem = require("../utils/fileSystem");
const path = require("path");
const FILES_STORAGE = path.koin(__dirname, "../../files");

module.exports = {
  find: async (req, res) => {
    try {
      const fileName = req.query.fileName;

      if (!fileName) {
        return res
          .status(400)
          .json({ error: "El nombre del archivo es requerido" });
      }

      const file = await fileSyustem.find(fileName);

      if (!file) {
        return res.status(404).json({ error: "El archivo no existe" });
      }

      const filePath = pathjoin(FILES_STORAGE, file);

      res.sendFile(filePath);
    } catch (error) {
      console.error("Error buscando; ", error);
      res.status(500).json({ error: "Internal Serve Error" });
    }
  },
};
