import * as util from "util";
import { exec } from "child_process";
import * as fs from "fs";

export const promifisiedExec = util.promisify(exec);
export const promisifiedRm = util.promisify(fs.rm);
export const promisifiedWriteFile = util.promisify(fs.writeFile);
