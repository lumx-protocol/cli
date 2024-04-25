var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import inquirer from "inquirer";
import * as fs from "fs";
import { questions } from "./utils/questions.js";
import { createJson } from "./utils/others.js";
import chalk from "chalk";
import ora from "ora";
import simpleGit from "simple-git";
import { createPathWithDashes, sanitizePath, splitStringAfterSlash, } from "./helpers/string.js";
import { BOILERPLATE_PATH } from "./helpers/consts.js";
import { promisifiedRm, promisifiedWriteFile, promifisiedExec, } from "./utils/promises.js";
export function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Welcome to ${chalk.bold(chalk.bgMagenta("Lumx"))} CLI v0.0.5 💜\n`);
        const selectedOptions = yield inquirer.prompt(questions);
        const pathWithDash = createPathWithDashes(sanitizePath(selectedOptions.pageTitle));
        const spinner = ora("Preparing your project! WAGMI\n").start();
        setTimeout(() => {
            spinner.text = "Doing some magic! 🪄✨\n";
        }, 5000);
        let repo = simpleGit();
        try {
            yield repo.clone(`https://github.com/Lumx-Protocol/${BOILERPLATE_PATH}`, `${pathWithDash}`);
        }
        catch (error) {
            console.error("Error: ", error);
        }
        yield promisifiedRm(`${pathWithDash}/.git`, { recursive: true });
        yield promisifiedRm(`${pathWithDash}/.github`, { recursive: true });
        const json = createJson({
            pageTitle: selectedOptions.pageTitle,
            pageDescription: selectedOptions.pageDescription,
            apiKey: selectedOptions.apiKey,
        });
        try {
            yield promisifiedWriteFile(`${pathWithDash}/lumx.json`, JSON.stringify(json));
        }
        catch (error) {
            console.error("Error creating lumx.json: ", error);
        }
        try {
            yield promisifiedWriteFile(`${pathWithDash}/package.json`, fs
                .readFileSync(`${pathWithDash}/package.json`, "utf-8")
                .replace(/create-lumx-dapp/g, pathWithDash), "utf-8");
        }
        catch (error) {
            console.error("Error creating package.json: ", error);
        }
        try {
            yield promisifiedWriteFile(`${pathWithDash}/.env.local`, `LUMX_API_KEY=${selectedOptions.apiKey}\nNEXT_PUBLIC_LUMX_ENV=sandbox\nNEXT_PUBLIC_ITEM_TYPE_ID=${selectedOptions.itemTypeId}\nNEXT_PUBLIC_CONTRACT_ID=${selectedOptions.contractId}\nNEXT_PUBLIC_CLIENT_ID=${splitStringAfterSlash(selectedOptions.apiKey)}`);
        }
        catch (err) {
            console.error("Error creating files: ", err);
        }
        try {
            yield promifisiedExec(`cd ${pathWithDash} && npm install && git init -b main`);
            spinner.succeed(`Congratulations! ${chalk.bold(pathWithDash)} has been created with the following options:\n`);
            const { journey, apiKey } = selectedOptions, optionsToShow = __rest(selectedOptions, ["journey", "apiKey"]);
            console.log(optionsToShow);
            console.log(`\nNow run cd ${chalk.bold(chalk.green(pathWithDash))} and start ${chalk.bold(chalk.bgCyan("coding"))}!🎉\n`);
        }
        catch (err) {
            console.error("Error installing dependencies: ", err);
        }
    });
}
