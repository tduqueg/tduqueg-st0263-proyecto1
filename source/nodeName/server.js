const express = require("express");
const bodyParser = require("body-parser");
const findController = require("./controllers/findController");
const systemController = require("./controllers/systemController");

function server(port, host, config) {
  const app = express();
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    req.config = config;
    req.storageMap = storageMap;
    next();
  });

  app.get("/find", findController.find);
  app.get("/resource", resourceController.create);
  app.put("/resource", resourceController.update);
  app.get("/health", systemController.health);
  app.get("/hashmap", systemController.hashmap);
  app.get("/ls", systemController.ls);

  app.listen(port, () => {
    console.log(`El nodo naming en  http://${host}:${port}`);
  });
}

module.exports = { server };
