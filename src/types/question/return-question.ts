import { QuestionType } from '@/utils/enums';
import { ReturnAnswer } from '../answer/return-answer';

export type ReturnQuestion = {
  id: string;
  prompt: string;
  type: QuestionType;
  answers: ReturnAnswer[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
