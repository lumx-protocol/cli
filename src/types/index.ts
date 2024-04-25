import { questions } from "src/utils/questions";

export type QuestionsKey = (typeof questions)[number]["name"];
export type AnsweredQuestions = Record<QuestionsKey, string>;
