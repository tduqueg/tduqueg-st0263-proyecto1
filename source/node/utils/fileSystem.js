const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");
const DIRECTORY_PATH = path.join(__dirname, "../../../files");

module.exports = {
  find: async (fileName) => {
    try {
      const files = await fs.readdir(DIRECTORY_PATH);

      const foundFile = files.find((file) => file === fileName);

      return foundFile ? foundFile : null;
    } catch (error) {
      console.error(error);
      return err;
    }
  },
  save: async (fileName, data) => {
    const filePath = path.join(DIRECTORY_PATH, fileName);

    await fs.writeFile(filePath, data);

    return filePath;
  },
};
