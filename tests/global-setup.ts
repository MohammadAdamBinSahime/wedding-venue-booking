import { execSync } from "child_process";

export default function globalSetup() {
  console.log("Seeding database for e2e tests...");
  execSync("npm run seed", {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}
