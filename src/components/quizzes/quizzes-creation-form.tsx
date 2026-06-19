'use client';

import { CreateQuiz } from '@/types/quiz/create-quiz';
import { cn } from '@/utils/cn';
import { QuestionType } from '@/utils/enums';
import { QUESTION_MENU_ITEMS, QUESTION_TYPE_LABELS } from '@/utils/question-type-labels';
import { Button } from '@primereact/ui/button';
import { ButtonGroup } from '@primereact/ui/buttongroup';
import { InputText } from '@primereact/ui/inputtext';
import { Label } from '@primereact/ui/label';
import { Menu } from '@primereact/ui/menu';
import { useState } from 'react';
import { QuestionCreateItem } from '../questions/questions-create-list-item';
import { useGlobalToast } from '@/providers/toast-provider';
import { useRouter } from 'next/navigation';
import { DraftQuestion } from '@/types/question/create-question';
import { validateQuizPayload } from '@/utils/validator';
import { QUIZZES_ROUTE } from '@/utils/router-constants';
import { ReturnQuiz } from '@/types/quiz/return-quiz';
import { useQuizCreateMutation } from '@/lib/api-endpoints';
import { DraftAnswer } from '@/types/answer/create-answer';

export function QuizCreationForm({
  initialQuiz,
  readOnly = false,
}: {
  initialQuiz?: ReturnQuiz;
  readOnly?: boolean;
}) {
  const toast = useGlobalToast();
  const router = useRouter();

  const [createQuiz] = useQuizCreateMutation();

  const [title, setTitle] = useState(initialQuiz?.title || '');
  const [questions, setQuestions] = useState<DraftQuestion[]>(() => {
    if (initialQuiz?.questions) {
      return initialQuiz.questions.map((q) => ({
        ...q,
        questionId: crypto.randomUUID(),
        answers: q.answers.map((a: DraftAnswer) => ({ ...a, frontendId: crypto.randomUUID() })),
      }));
    }
    return [];
  });

  const [pickedType, setPickedType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion: DraftQuestion = {
      questionId: crypto.randomUUID(),
      type: pickedType,
      prompt: '',
      answers: [],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.questionId !== id));
  };

  const handleQuestionUpdate = (
    questionId: string,
    updater: (prevQ: DraftQuestion) => DraftQuestion,
  ) => {
    setQuestions((prev) => prev.map((q) => (q.questionId === questionId ? updater(q) : q)));
  };

  const handleSubmit = async () => {
    const validationError = validateQuizPayload(title, questions);

    if (validationError) {
      toast.showToast('error', { summary: 'Validation Failed', detail: validationError });
      return;
    }

    const payload: CreateQuiz = {
      title: title.trim(),
      questions: questions.map(({ questionId, ...restOfQuestion }) => ({
        ...restOfQuestion,
        answers: restOfQuestion.answers.map(({ answerId, ...restOfAnswer }) => ({
          ...restOfAnswer,
        })),
      })),
    };

    setIsSubmitting(true);

    try {
      if (!initialQuiz?.id) {
        await createQuiz(payload).unwrap();
        toast.showToast('success', { summary: 'Success!', detail: 'Quiz created successfully' });
      }

      router.push(QUIZZES_ROUTE);
    } catch (error) {
      toast.showToast('error', { summary: 'Error', detail: 'Failed to save quiz' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 mb-4 flex flex-col justify-between gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-end'>
        <div className='flex w-full flex-col gap-1'>
          <div className='flex w-full max-w-md flex-col gap-1.5'>
            <Label htmlFor='titleInput' className='text-lg'>
              Quiz Title
            </Label>
            <InputText
              disabled={readOnly}
              id='titleInput'
              placeholder='e.g. My Quiz'
              className='text-surface-900 dark:text-surface-0 w-full text-xl font-bold disabled:opacity-100'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {!readOnly && (
          <Button
            raised
            severity='success'
            className='flex shrink-0 items-center'
            onClick={handleSubmit}
            loading={isSubmitting || undefined}
          >
            <i className='pi pi-save sm:mr-2' />
            <span className='hidden font-bold sm:block'>Save Quiz</span>
          </Button>
        )}
      </div>

      <div className='flex flex-col gap-4'>
        {questions.map((question, index) => (
          <QuestionCreateItem
            key={question.questionId}
            index={index}
            question={question}
            onRemove={handleRemoveQuestion}
            onChange={handleQuestionUpdate}
            readOnly={readOnly}
          />
        ))}
      </div>

      {!readOnly && (
        <div className='flex justify-end'>
          <Menu.Root>
            <ButtonGroup className='flex w-full sm:w-auto'>
              <Button
                type='button'
                onClick={handleAddQuestion}
                raised
                rounded
                variant='outlined'
                className='flex shrink-0 items-center'
              >
                <i className='pi pi-plus sm:mr-2' />
                <span className='hidden sm:block'>Add </span>
              </Button>

              <Menu.Trigger
                severity=''
                variant='outlined'
                rounded
                className='shrink-0 justify-center px-3 sm:w-auto'
              >
                <span className={cn('hidden', pickedType && 'mr-2 inline')}>
                  {QUESTION_TYPE_LABELS[pickedType]} question
                </span>
                <i className='pi pi-chevron-down' />
              </Menu.Trigger>
            </ButtonGroup>

            <Menu.Portal>
              <Menu.List className='m-0 flex list-none flex-col gap-1 p-0'>
                {QUESTION_MENU_ITEMS.map((item) => (
                  <Menu.Item
                    key={item.type}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm transition-colors',
                      pickedType === item.type
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-800',
                    )}
                    onPointerDown={() => setPickedType(item.type)}
                  >
                    <i className={`pi ${item.icon} text-surface-500`} />
                    <span className='inline'>{QUESTION_TYPE_LABELS[item.type]}</span>
                  </Menu.Item>
                ))}
              </Menu.List>
            </Menu.Portal>
          </Menu.Root>
        </div>
      )}
    </div>
  );
}
