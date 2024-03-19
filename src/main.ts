import inquirer from "inquirer";
import { execSync } from "child_process";
import * as fs from "fs";
import { questions } from "./utils/questions.js";
import { createJson } from "./utils/others.js";

type QuestionsKey = (typeof questions)[number]["name"];
export type AnsweredQuestions = Record<QuestionsKey, string>;

export async function main() {
  console.log("Welcome to Lumx CLI! 💜\n");

  const selectedOptions = await inquirer.prompt<AnsweredQuestions>(questions);

  console.log("\nYour project will be created with the following options:");
  const { journey, ...options } = selectedOptions;
  const { apiKey, ...optionsToShow } = options;
  console.log(optionsToShow);

  console.log("\nCreating your project...\n");

  const path = options.pageTitle.toLowerCase().replace(/ /g, "-");
  const BOILERPLATE_PATH = "create-lumx-dapp";

  execSync(`
    git clone --quiet https://github.com/Lumx-Protocol/${BOILERPLATE_PATH}
	mv ${BOILERPLATE_PATH} ${path}
    cd ${path}
    rm lumx.json
    rm yarn.lock
    rm -r .github
    npm install
  `);

  const json = createJson(options);

  fs.writeFileSync(`${path}/lumx.json`, JSON.stringify(json));

  fs.writeFileSync(
    `${path}/package.json`,
    fs
      .readFileSync(`${path}/package.json`, "utf-8")
      .replace(/create-lumx-dapp/g, path),
  );

  fs.writeFileSync(
    `${path}/.env`,
    `LUMX_API_KEY=${options.apiKey}\nNEXT_PUBLIC_LUMX_ENV=sandbox`,
  );

  console.log("Congratulations! Your project has been created! 🎉");
}
