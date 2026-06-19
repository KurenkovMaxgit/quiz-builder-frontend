import { AnswerCorrectness } from '@/utils/enums';
import { InputText } from '@primereact/ui/inputtext';
import { Button } from '@primereact/ui/button';
import { RadioButton } from '@primereact/ui/radiobutton';
import { Checkbox } from '@primereact/ui/checkbox';
import { DraftAnswer } from '@/types/answer/create-answer';

interface AnswerConfigProps {
  answers: DraftAnswer[];
  onAnswersChange: (updater: (prev: DraftAnswer[]) => DraftAnswer[]) => void;
  readOnly?: boolean;
}

export function SingleChoiceAnswers({ answers, onAnswersChange, readOnly }: AnswerConfigProps) {
  const handleSelectCorrect = (selectedIndex: number) => {
    onAnswersChange((prevAnswers) =>
      prevAnswers.map((ans, i) => ({
        ...ans,
        correctness: i === selectedIndex ? AnswerCorrectness.CORRECT : AnswerCorrectness.INCORRECT,
      })),
    );
  };

  const handleAddOption = () => {
    onAnswersChange((prevAnswers) => [
      ...prevAnswers,
      { answerId: crypto.randomUUID(), content: '', correctness: AnswerCorrectness.INCORRECT },
    ]);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    onAnswersChange((prevAnswers) => prevAnswers.filter((_, i) => i !== indexToRemove));
  };

  const handleContentChange = (indexToUpdate: number, newContent: string) => {
    onAnswersChange((prevAnswers) =>
      prevAnswers.map((ans, i) => (i === indexToUpdate ? { ...ans, content: newContent } : ans)),
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      {answers.map((answer, index) => (
        <div key={answer.answerId || index} className='flex items-center gap-3'>
          <RadioButton.Root
            disabled={readOnly}
            checked={answer.correctness === AnswerCorrectness.CORRECT}
            onCheckedChange={() => handleSelectCorrect(index)}
          >
            <RadioButton.Box>
              <RadioButton.Indicator match='checked' />
            </RadioButton.Box>
          </RadioButton.Root>

          <InputText
            disabled={readOnly}
            value={answer.content}
            className='w-full'
            placeholder={`Option ${index + 1}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleContentChange(index, e.target.value)
            }
          />
          {!readOnly && (
            <Button
              type='button'
              severity='danger'
              rounded
              variant='outlined'
              onClick={() => handleRemoveOption(index)}
            >
              <i className='pi pi-times my-1' />
            </Button>
          )}
        </div>
      ))}

      {!readOnly && (
        <Button
          type='button'
          label='Add Option'
          rounded
          variant='outlined'
          size='small'
          className='mt-2 w-fit'
          onClick={handleAddOption}
        >
          <i className='pi pi-plus my-1' />
        </Button>
      )}
    </div>
  );
}

export function MultipleChoiceAnswers({ answers, onAnswersChange, readOnly }: AnswerConfigProps) {
  const handleToggleCorrect = (toggledIndex: number, isChecked: boolean) => {
    onAnswersChange((prevAnswers) =>
      prevAnswers.map((ans, i) =>
        i === toggledIndex
          ? {
              ...ans,
              correctness: isChecked ? AnswerCorrectness.CORRECT : AnswerCorrectness.INCORRECT,
            }
          : ans,
      ),
    );
  };

  const handleAddOption = () => {
    onAnswersChange((prevAnswers) => [
      ...prevAnswers,
      { answerId: crypto.randomUUID(), content: '', correctness: AnswerCorrectness.INCORRECT },
    ]);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    onAnswersChange((prevAnswers) => prevAnswers.filter((_, i) => i !== indexToRemove));
  };

  const handleContentChange = (indexToUpdate: number, newContent: string) => {
    onAnswersChange((prevAnswers) =>
      prevAnswers.map((ans, i) => (i === indexToUpdate ? { ...ans, content: newContent } : ans)),
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      {answers.map((answer, index) => (
        <div key={answer.answerId || index} className='flex items-center gap-3'>
          <Checkbox.Root
            disabled={readOnly}
            checked={answer.correctness === AnswerCorrectness.CORRECT}
            onCheckedChange={(e: { checked: boolean }) => handleToggleCorrect(index, e.checked)}
          >
            <Checkbox.Box>
              <Checkbox.Indicator match='checked'></Checkbox.Indicator>
            </Checkbox.Box>
          </Checkbox.Root>

          <InputText
            disabled={readOnly}
            value={answer.content}
            className='w-full'
            placeholder={`Option ${index + 1}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleContentChange(index, e.target.value)
            }
          />
          {!readOnly && (
            <Button
              type='button'
              severity='danger'
              rounded
              variant='outlined'
              onClick={() => handleRemoveOption(index)}
            >
              <i className='pi pi-times my-1' />
            </Button>
          )}
        </div>
      ))}
      {!readOnly && (
        <Button
          type='button'
          label='Add Option'
          rounded
          variant='outlined'
          size='small'
          className='mt-2 w-fit'
          onClick={handleAddOption}
        >
          <i className='pi pi-plus my-1' />
        </Button>
      )}
    </div>
  );
}

export function TextInputAnswers({ answers, onAnswersChange, readOnly }: AnswerConfigProps) {
  const answer = answers[0] || {
    frontendId: crypto.randomUUID(),
    content: '',
    correctness: AnswerCorrectness.CORRECT,
  };

  return (
    <div className='flex items-center gap-3'>
      <i className='pi pi-check font-bold text-green-500' />
      <InputText
        disabled={readOnly}
        value={answer.content}
        className='w-full disabled:opacity-100'
        placeholder='Enter the exact required text...'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (readOnly) return;
          const newVal = e.target.value;
          onAnswersChange(() => [
            {
              frontendId: answer.answerId,
              content: newVal,
              correctness: AnswerCorrectness.CORRECT,
            },
          ]);
        }}
      />
    </div>
  );
}
