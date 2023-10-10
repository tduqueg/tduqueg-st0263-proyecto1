const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const manager = require(path.join(__dirname, "../../grpc/manager"));
const createFile = require(path.join(__dirname, "./utils/create"));
const fileSystem = require(path.join(__dirname, "./utils/fileSystem"));

async function getServer() {
  console.info("Iniciando el nodo...");

  var server = new grpc.Server();
  server.addService(fileManager.service, {
    createFile,

    UploadFile: (call, callback) => {
      let data = Buffer.alloc(0);
      let fileName = null;
      call.on("data", (chunk) => {
        if (!fileName) {
          fileName = chunk.fileName;
        }

        data = Buffer.concat([data, chunk.chunk]);
      });

      call.on("end", () => {
        if (!fileName) {
          callback("No se ha especificado un nombre de archivo", null);
          return;
        }

        fs.writeFile(
          path.join(__dirname, `../../../files/${fileName}`),
          data,
          (err) => {
            if (err) {
              callback(err, {
                success: false,
                message: "No se pudo subir el archivo",
              });
              return;
            } else {
              callback(null, {
                success: true,
                message: "El archivo se subio correctamente",
              });
            }
          }
        );
      });
    },
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Servidor iniciado en el puerto 50051");
    }
  );
}

getServer();
