import { DraftQuestion } from '@/types/question/create-question';
import { AnswerCorrectness, QuestionType } from './enums';

export const validateQuizPayload = (title: string, questions: DraftQuestion[]): string | null => {
  const tLen = title.trim().length;
  if (tLen < 4 || tLen > 250) return 'Quiz title must be between 4 and 250 characters.';
  if (questions.length === 0) return 'You must add at least one question.';

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = i + 1;

    const pLen = q.prompt.trim().length;
    if (pLen < 4 || pLen > 250)
      return `Question ${qNum} prompt must be between 4 and 250 characters.`;

    if (q.type === QuestionType.SINGLE_CHOICE || q.type === QuestionType.MULTIPLE_CHOICE) {
      if (q.answers.length < 2) return `Question ${qNum} needs at least 2 options.`;

      for (let j = 0; j < q.answers.length; j++) {
        const aLen = q.answers[j].content.trim().length;
        if (aLen < 4 || aLen > 250) {
          return `Question ${qNum}, Option ${j + 1} must be between 4 and 250 characters.`;
        }
      }

      const correctCount = q.answers.filter(
        (a) => a.correctness === AnswerCorrectness.CORRECT,
      ).length;
      if (q.type === QuestionType.SINGLE_CHOICE && correctCount !== 1) {
        return `Question ${qNum} (Single Choice) must have exactly 1 correct option selected.`;
      }
      if (q.type === QuestionType.MULTIPLE_CHOICE && correctCount < 1) {
        return `Question ${qNum} (Multiple Choice) must have at least 1 correct option selected.`;
      }
    }

    if (q.type === QuestionType.TEXT_INPUT) {
      if (q.answers.length === 0) return `Question ${qNum} requires a valid text answer.`;
      const aLen = q.answers[0].content.trim().length;
      if (aLen < 4 || aLen > 250) {
        return `Question ${qNum} text answer must be between 4 and 250 characters.`;
      }
    }
  }

  return null;
};
