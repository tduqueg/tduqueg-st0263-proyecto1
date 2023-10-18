const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const storageFilePath = path.join(__dirname, "storage.json");

function hashName(name) {
  return crypto.createHash("sha256").update(name).digest("hex");
}

function saveStorageMap(storageMap) {
  const storageMapJson = JSON.stringify(storageMap);
  fs.writeFileSync(storageFilePath, storageMapJson);
}

function loadStorageMap() {
  try {
    const storageMapJson = fs.readFileSync(storageFilePath);
    return JSON.parse(storageMapJson);
  } catch (error) {
    console.error("Error al cargar el mapa de almacenamiento", error);
    return {};
  }
}

module.exports = {
  find: (name) => {
    const key = hashName(name);
    const storageMap = loadStorageMap();
    const storageNodeIps = storageMap[key];

    if (!storageNodeIps) {
      throw new Error("No se encontro el archivo");
    }

    return storageNodeIps;
  },
  save: (name, storageNodeIps) => {
    if (!Array.isArray(storageNodeIps) || storageNodeIps.length !== 2) {
      throw new Error(
        "Los nodos de almacenamiento deben ser un arreglo de dos elementos"
      );
    }

    const key = hashName(name);
    const storageMap = loadStorageMap();
    if (storageMap[key]) {
      throw new Error("La llave no está disponible");
    }

    storageMap[key] = {
      fileName: name,
      ips: storageNodeIps,
    };
    saveStorageMap(storageMap);
  },

  exists: (name) => {
    const key = hashName(name);
    const storageMap = loadStorageMap();
    return !!storageMap[key];
  },

  getAllFiles: () => {
    const storageMap = loadStorageMap();
    return Object.values(storageMap).map((entry) => entry.fileName);
  },

  getEntireMap: () => {
    return loadStorageMap();
  },

  setEntireMap: (newMap) => {
    const mapToSave = new Map(Object.entries(newMap));
    saveStorageMap(mapToSave);
  },
};
