require("express-async-errors");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const findController = require("./controller/find");
const resourceController = require("./controller/resource");
const { error } = require("console");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    const filePath = path.join("./files", file.originalname);

    if (req.method === "PUT") {
      return cb(null, file.originalname);
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        return cb(new Error("El archivo ya existe mi papá"));
      }
      cb(null, file.originalname);
    });
  },
});

const errHandling = (err, req, res, next) => {
  res.status(500).json({ msg: err.message, success: false });
};

function server(port, host, config) {
  const app = express();
  const upload = multer({ storage: storage });
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    req.config = config;

    next();
  });

  app.get("/find", findController.find);
  app.post("/resource", upload.single("file"), resourceController.create);
  app.put("/resource", upload.single("file"), resourceController.update);
  app.use(errHandling);
  app.listen(port, () => {
    console.log(`El nodo está corriendo en http://${host}:${port}`);
  });
}

module.exports = {
  server,
};
