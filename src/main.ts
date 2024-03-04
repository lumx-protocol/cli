import inquirer from "inquirer";
import { execSync } from "child_process";
import * as fs from "fs";
import { questions } from "./utils/questions.js";
import { sleep, createJson } from "./utils/others.js";

export async function main() {
  console.log("Welcome to Lumx CLI! 💜\n");

  const selectedOptions = await inquirer.prompt(questions);

  console.log("\nYour project will be created with the following options:");
  const { apiKey, journey, ...options } = selectedOptions;
  console.log(options);

  console.log("\nCreating your project...\n");

  const path = "create-lumx-dapp";

  execSync(`
    git clone --quiet https://github.com/Lumx-Protocol/${path}
    cd ${path}
    npm install
    rm lumx.json
  `);

  const json = createJson(options);

  fs.writeFileSync(`${path}/lumx.json`, JSON.stringify(json));

  fs.writeFileSync(
    `${path}/.env`,
    `
    LUMX_API_KEY=${apiKey}
    LUMX_ENV=sandbox
  `
  );

  console.log("Congratulations! Your project has been created! 🎉");
}
