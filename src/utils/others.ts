import { AnsweredQuestions } from "src/types";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export type OptionsConfig = Omit<
  AnsweredQuestions,
  "journey" | "contractId" | "itemTypeId"
> &
  typeof template;

const template = {
  language: "pt",
  addons: ["tokengating"],
} as const;

function createJson(
  options: Omit<AnsweredQuestions, "journey" | "contractId" | "itemTypeId">,
) {
  const json: OptionsConfig = {
    ...template,
    ...options,
  };

  return json;
}

export { sleep, createJson };
