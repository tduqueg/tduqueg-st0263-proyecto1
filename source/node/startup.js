const axios = require("axios");
const storage = require("./utils/storage");

function startup(config) {
  console.log("iniciando toda la vuelta...");
  const storageNodes = config.storageNodes;
  console.log("Storage Nodes:", storageNodes);

  const otherNameNodeIP = config.namingNodes[0];
  console.log("Otro Naming Node:", otherNameNodeIP);

  axios
    .get(`http://${otherNameNodeIP}:80/health`)
    .then((response) => {
      if (response.status === 200) {
        axios
          .get(`http://${otherNameNodeIP}:80/get-current-hashmap`)
          .then((hashMapResponse) => {
            storage.setEntireMap(hashMapResponse.data);
            console.log("Exitosa sincronizacion con otro NameNode.");
          })
          .catch((error) => {
            console.error("Fallo al conetarse con otro NameNode", error);
          });
      }
    })
    .catch((error) => {
      //console.log('Other NameNode is not alive:', error);
    });
}

module.exports = {
  startup,
};
