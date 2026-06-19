import { BaseEntity } from './base.entity';
import { QuizQuestion } from './question.entity';

export interface Quiz extends BaseEntity {
  title: string;

  questions: QuizQuestion[];
}
