const axios = require("axios");
const storage = require("./utils/storage");
const e = require("express");

function startup(config) {
  console.log("Empezando...");
  const storageNodes = config.storageNodes;
  console.log("Nodos de almacenamiento: ", storageNodes);

  const otherNameNodeIP = config.namingNodes[0];
  console.log("Otro nodo naming: ", otherNameNodeIP);

  axios
    .get(`http://${otherNameNodeIP}:80/health`)
    .then((response) => {
      if (response.status === 200) {
        axios
          .get(`http://${otherNameNodeIP}:80/hashmap`)
          .then((hashMapResponse) => {
            storage.setEntireMap(hashMapResponse.data);
            console.log("HashMap sincronizado con el otro nodo");
          })
          .catch((error) => {
            console.error(
              "Error al sincronizar el HashMap con el otro nodo",
              error
            );
          });
      }
    })
    .catch((error) => {
      //HOla como estás
    });
}

module.exports = { startup };
