require("express-async-errors");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const findController = require("./controller/find");
const resourceController = require("./controller/resource");

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

const errHandling = (err, req, res, next) => {};
