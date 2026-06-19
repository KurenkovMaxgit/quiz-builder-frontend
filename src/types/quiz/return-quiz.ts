import { PublicReturnQuestion } from '../question/return-question';

export type ReturnQuiz = {
  id: string;
  title?: string;
  description?: string;
  questions?: PublicReturnQuestion[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ReturnQuizListItem = Omit<ReturnQuiz, 'questions'> & { questionCount: number };
