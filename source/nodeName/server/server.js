const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const dotenv = require("dotenv");

dovtenv.config({ path: path.join(__dirname, "../../../.env") });

const manager = require(path.join(__dirname, "../../grpc/manager"));
const createFile = require(path.join(__dirname, "./utils/create"));

async function getServer() {
  console.info("Iniciando el naming node GRPC...");

  var server = new grpc.Server();
  server.addService(manager.Manager.service, {
    create: createFile,
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

getServer();
