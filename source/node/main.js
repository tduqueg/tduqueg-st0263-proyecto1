const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;
const { server } = require("./server");
const { startup } = require("./startup");
dotenv.config({ path: path.join(__dirname, "../.env") });
const configPath = path.join(__dirname, "./config.json");
const host = process.env.STORAGE_HOST;
const port = process.env.STORAGE_PORT;

async function main() {
  const configContent = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(configContent);

  startup(config || {});
  server(port, host, config);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
