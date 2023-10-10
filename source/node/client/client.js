const grpc = require("@grpc/grpc-js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

dotenv.config({ path: path.join(__dirname, "../../../.env") });
const manager = require(path.join(__dirname, "../../grpc/manager"));

const { RPC_PORT, NAMING_NODE_HOST } = process.env;

const createFile = (storageIps, fileName, HOST, PORT) => {
  const client = new manager(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  );
  client.createFIle({ storageIps, fileName }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("La respuesta fue recibida de un servicio remoto :D", response);
  });
};

const uploadFile = (fileName, HOST) => {
  const client = new manager(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  );
  const fileStream = fs.createReadStream(
    path.join(__dirname, `../../../files/${fileName}`)
  );
  const call = client.UploadFile((error, response) => {
    if (response.success) {
      console.log("El archivo se subió correctamente");
    } else {
      console.log("El archivo no se subió correctamente");
    }
  });
  fileStream.on("data", (chunk) => {
    call.write({ fileName, chunk });
  });

  fileStream.on("end", () => {
    call.end();
  });
};

module.exports = {
  createFile,
  uploadFile,
};
