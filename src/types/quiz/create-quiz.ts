import { CreateQuestion } from "../question/create-question";

export type CreateQuiz = {
  title: string;
  questions: CreateQuestion[];
};
