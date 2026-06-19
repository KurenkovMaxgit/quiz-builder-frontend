'use client';

import { QuestionType } from '@/utils/enums';
import { InputText } from '@primereact/ui/inputtext';
import { Button } from '@primereact/ui/button';
import { QUESTION_TYPE_LABELS } from '@/utils/question-type-labels';
import { DraftQuestion } from '@/types/question/create-question';
import {
  SingleChoiceAnswers,
  MultipleChoiceAnswers,
  TextInputAnswers,
} from '../answers/answers-create-form';
import { DraftAnswer } from '@/types/answer/create-answer';

export function QuestionCreateItem({
  question,
  index,
  onRemove,
  onChange,
  readOnly,
}: {
  question: DraftQuestion;
  index: number;
  onRemove: (id: string) => void;
  onChange: (id: string, updater: (prev: DraftQuestion) => DraftQuestion) => void;
  readOnly?: boolean;
}) {
  const handleAnswersChange = (updater: (prevAnswers: DraftAnswer[]) => DraftAnswer[]) => {
    onChange(question.questionId, (prevQ) => ({
      ...prevQ,
      answers: updater(prevQ.answers as DraftAnswer[]),
    }));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(question.questionId, (prevQ) => ({
      ...prevQ,
      prompt: newVal,
    }));
  };
  const renderQuestionSpecifics = () => {
    switch (question.type) {
      case QuestionType.SINGLE_CHOICE:
        return (
          <SingleChoiceAnswers
            answers={question.answers}
            onAnswersChange={handleAnswersChange}
            readOnly={readOnly}
          />
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceAnswers
            answers={question.answers}
            onAnswersChange={handleAnswersChange}
            readOnly={readOnly}
          />
        );

      case QuestionType.TEXT_INPUT:
        return (
          <TextInputAnswers
            answers={question.answers}
            onAnswersChange={handleAnswersChange}
            readOnly={readOnly}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className='bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 flex flex-col gap-4 rounded-xl border shadow-sm'>
      <div className='border-surface-200 dark:border-surface-700 flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-2 font-bold'>
          <span className='bg-surface-100 dark:bg-surface-800 flex h-8 w-8 items-center justify-center rounded-full'>
            {index + 1}
          </span>
          <span>{QUESTION_TYPE_LABELS[question.type]}</span>
        </div>
        {!readOnly && (
          <Button
            severity='danger'
            variant='outlined'
            rounded
            onClick={() => onRemove(question.questionId)}
          >
            <i className='pi pi-trash my-1' />
          </Button>
        )}
      </div>

      <div className='px-4'>
        <InputText
          disabled={readOnly}
          value={question.prompt}
          onChange={handlePromptChange}
          placeholder='Enter your question here...'
          className='w-full font-medium'
        />
      </div>

      <div className='px-4 pb-4'>{renderQuestionSpecifics()}</div>
    </div>
  );
}
