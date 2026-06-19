import { QuestionType } from '@/utils/enums';
import { CreateAnswer, DraftAnswer } from '../answer/create-answer';

export type CreateQuestion = {
  prompt: string;
  type: QuestionType;
  answers: CreateAnswer[];
};

export type DraftQuestion = Omit<CreateQuestion, 'answers'> & {
  questionId: string;
  answers: DraftAnswer[];
};
