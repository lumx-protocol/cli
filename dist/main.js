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
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { questions } from './utils/questions.js';
import { createJson } from './utils/others.js';
export function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Welcome to Lumx CLI! 💜\n');
        const selectedOptions = yield inquirer.prompt(questions);
        console.log('\nYour project will be created with the following options:');
        const { journey } = selectedOptions, options = __rest(selectedOptions, ["journey"]);
        const { apiKey } = options, optionsToShow = __rest(options, ["apiKey"]);
        console.log(optionsToShow);
        console.log('\nCreating your project...\n');
        const path = options.pageTitle.toLowerCase().replace(/ /g, '-');
        const BOILERPLATE_PATH = 'create-lumx-dapp';
        execSync(`
    git clone --quiet https://github.com/Lumx-Protocol/${BOILERPLATE_PATH}
	mv ${BOILERPLATE_PATH} ${path}
    cd ${path}
    npm install
    rm lumx.json
  `);
        const json = createJson(options);
        fs.writeFileSync(`${path}/lumx.json`, JSON.stringify(json));
        fs.writeFileSync(`${path}/package.json`, fs
            .readFileSync(`${path}/package.json`, 'utf-8')
            .replace(/create-lumx-dapp/g, path));
        fs.writeFileSync(`${path}/.env`, `LUMX_API_KEY=${options.apiKey}\nNEXT_PUBLIC_LUMX_ENV=sandbox`);
        console.log('Congratulations! Your project has been created! 🎉');
    });
}
