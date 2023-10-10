const createFile = (params, callback) => {
  const storageIps = params.request.storageIps;
  console.log("creando el archivo");
  console.log(storageIps);
  const status_code = 201;
  callback(null, { status_code });
};

module.exports = createFile;
