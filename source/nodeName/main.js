const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const { startup } = require("./startup");
const { server } = require("./server");

dotenv.config({ path: path.join(__dirname, "../../.env") });
const configPath = path.join(__dirname, "./config.json");
const port = process.env.NAMING_NODE_PORT || 3000;
const host = process.env.NAMING_NODE_HOST || "localhost";

async function main() {
  global.storageMap = new Map();
  const configContent = await fs.readFile(configPath, "utf-8");
  const config = JSON.parse(configContent);

  startup(config);
  server(port, host, config);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
