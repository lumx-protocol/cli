import inquirer from "inquirer";
import * as fs from "fs";
import { questions } from "./utils/questions.js";
import { createJson } from "./utils/others.js";
import chalk from "chalk";
import ora from "ora";
import simpleGit, { SimpleGit } from "simple-git";
import {
  createPathWithDashes,
  sanitizePath,
  splitStringAfterSlash,
} from "./helpers/string.js";
import { BOILERPLATE_PATH } from "./helpers/consts.js";
import { AnsweredQuestions } from "./types/index.js";
import {
  promisifiedRm,
  promisifiedWriteFile,
  promifisiedExec,
} from "./utils/promises.js";

export async function main() {
  console.log(
    `Welcome to ${chalk.bold(chalk.bgMagenta("Lumx"))} CLI v0.0.5 💜\n`,
  );

  const selectedOptions = await inquirer.prompt<AnsweredQuestions>(questions);

  const pathWithDash = createPathWithDashes(
    sanitizePath(selectedOptions.pageTitle),
  );

  const spinner = ora("Preparing your project! WAGMI\n").start();

  setTimeout(() => {
    spinner.text = "Doing some magic! 🪄✨\n";
  }, 5000);

  let repo: SimpleGit = simpleGit();

  try {
    await repo.clone(
      `https://github.com/Lumx-Protocol/${BOILERPLATE_PATH}`,
      `${pathWithDash}`,
    );
  } catch (error) {
    console.error("Error: ", error);
  }

  await promisifiedRm(`${pathWithDash}/.git`, { recursive: true });

  await promisifiedRm(`${pathWithDash}/.github`, { recursive: true });

  const json = createJson({
    pageTitle: selectedOptions.pageTitle,
    pageDescription: selectedOptions.pageDescription,
    apiKey: selectedOptions.apiKey,
  });

  try {
    await promisifiedWriteFile(
      `${pathWithDash}/lumx.json`,
      JSON.stringify(json),
    );
  } catch (error) {
    console.error("Error creating lumx.json: ", error);
  }

  try {
    await promisifiedWriteFile(
      `${pathWithDash}/package.json`,
      fs
        .readFileSync(`${pathWithDash}/package.json`, "utf-8")
        .replace(/create-lumx-dapp/g, pathWithDash),
      "utf-8",
    );
  } catch (error) {
    console.error("Error creating package.json: ", error);
  }

  try {
    await promisifiedWriteFile(
      `${pathWithDash}/.env.local`,
      `LUMX_API_KEY=${selectedOptions.apiKey}\nNEXT_PUBLIC_LUMX_ENV=sandbox\nNEXT_PUBLIC_ITEM_TYPE_ID=${selectedOptions.itemTypeId}\nNEXT_PUBLIC_CONTRACT_ID=${selectedOptions.contractId}\nNEXT_PUBLIC_CLIENT_ID=${splitStringAfterSlash(selectedOptions.apiKey)}`,
    );
  } catch (err) {
    console.error("Error creating files: ", err);
  }

  try {
    await promifisiedExec(
      `cd ${pathWithDash} && npm install && git init -b main`,
    );
    spinner.succeed(
      `Congratulations! ${chalk.bold(pathWithDash)} has been created with the following options:\n`,
    );
    const { journey, apiKey, ...optionsToShow } = selectedOptions;
    console.log(optionsToShow);

    console.log(
      `\nNow run cd ${chalk.bold(chalk.green(pathWithDash))} and start ${chalk.bold(chalk.bgCyan("coding"))}!🎉\n`,
    );
  } catch (err) {
    console.error("Error installing dependencies: ", err);
  }
}
