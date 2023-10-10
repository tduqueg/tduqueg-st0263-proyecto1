const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, process.env),
  { keepCase: true, longs: String, enums: String, default: true, oneofs: true }
);

const manager = grpc.loadPackageDefinition(packageDefinition).manager;

module.exports = fileManager;
