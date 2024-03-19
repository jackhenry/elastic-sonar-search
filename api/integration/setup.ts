import fs from "node:fs";
import path from "node:path";
import { Environment } from "./helpers";
const SNAPSHOTS = path.resolve("./integration/snapshots");

// Remove previous snapshots if they exist
fs.rmSync(SNAPSHOTS, {
  recursive: true,
  force: true,
});

fs.mkdirSync(SNAPSHOTS);

await Environment.hardSync();
await Environment.createSnapshot();
