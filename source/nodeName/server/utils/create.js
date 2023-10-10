const { save, find } = require("../../utils/storage");

const createFile = (params, callback) => {
  const storageIps = params.request.storageIps;
  const fileName = params.request.fileName;

  console.log("StorageIps: ", storageIps);
  console.log("FileName: ", fileName);

  try {
    save(fileName, storageIps);
    console.log(find(fileName));
    const status_code = 201;
    callback(null, { status_code });
  } catch (error) {
    console.error("Error en la creacion", error);
    callback(error);
  }
};

module.exports = { createFile };
