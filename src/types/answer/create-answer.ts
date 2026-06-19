import { AnswerCorrectness } from '@/utils/enums';

export type CreateAnswer = {
  content: string;
  correctness: AnswerCorrectness;
};

export type DraftAnswer = CreateAnswer & { answerId?: string };
