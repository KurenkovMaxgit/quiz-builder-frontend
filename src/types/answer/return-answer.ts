import { AnswerCorrectness } from '@/utils/enums';

export type ReturnAnswer = {
  id: string;
  content: string;
  correctness?: AnswerCorrectness;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
