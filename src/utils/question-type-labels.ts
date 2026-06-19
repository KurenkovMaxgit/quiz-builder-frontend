import { QuestionType } from './enums';

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.SINGLE_CHOICE]: 'Single choice',
  [QuestionType.MULTIPLE_CHOICE]: 'Multiple choice',
  [QuestionType.TEXT_INPUT]: 'Text input',
};

export const QUESTION_MENU_ITEMS = [
  { type: QuestionType.SINGLE_CHOICE, icon: 'pi-check-circle' },
  { type: QuestionType.MULTIPLE_CHOICE, icon: 'pi-check-square' },
  { type: QuestionType.TEXT_INPUT, icon: 'pi-pencil' },
];