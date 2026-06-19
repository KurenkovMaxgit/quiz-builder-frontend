'use client';

import { ApiResponse } from '@/interfaces/common/api-response-interface';
import { useQuizDeleteByIdMutation } from '@/lib/api-endpoints';
import { useGlobalToast } from '@/providers/toast-provider';
import { ReturnQuizListItem } from '@/types/quiz/return-quiz';
import { QUIZZES_ROUTE } from '@/utils/router-constants';
import { Button } from '@primereact/ui/button';
import { ConfirmPopup } from '@primereact/ui/confirmpopup';
import Link from 'next/link';

export function QuizListItem(quiz: ReturnQuizListItem) {
  const toast = useGlobalToast();

  const [deleteQuiz, { isLoading: isDeleting }] = useQuizDeleteByIdMutation();

  const handleDeleteQuiz = async () => {
    try {
      const deletedQuiz: ApiResponse<unknown> = await deleteQuiz(quiz.id).unwrap();

      if (deletedQuiz.data) {
        toast.showToast('success', { summary: 'Success!', detail: 'Quiz deleted successfully' });
      }
    } catch {
      toast.showToast('error', { summary: 'Error!', detail: 'Error deleting company' });
    }
  };

  return (
    <div className='bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 mb-4 flex flex-col justify-between gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-3'>
          <span className='text-surface-900 dark:text-surface-0 text-xl font-bold'>
            {quiz.title}
          </span>
        </div>
      </div>
      <div className='flex shrink-0 justify-end gap-4 sm:ml-auto sm:items-center'>
        <span className='text-surface-900 dark:text-surface-0 text-md my-auto'>
          {quiz.questionCount} question(s)
        </span>
        <Link href={`${QUIZZES_ROUTE}/${quiz.id}`}>
          <Button rounded variant='outlined' severity='contrast' className='shrink-0'>
            <i className='pi pi-eye my-1' />
          </Button>
        </Link>
        <ConfirmPopup.Root>
          <ConfirmPopup.Trigger
            rounded
            severity='danger'
            variant='outlined'
            className='w-justify-center'
          >
            <i className='pi pi-trash my-1' />
          </ConfirmPopup.Trigger>

          <ConfirmPopup.Portal>
            <ConfirmPopup.Content>
              <div className='border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b p-2 pb-3'>
                <i className='pi pi-exclamation-triangle mb-1' />
                <p className='m-0'>Are you sure you want to delete this quiz?</p>
              </div>
            </ConfirmPopup.Content>

            <ConfirmPopup.Footer>
              <ConfirmPopup.Reject severity='contrast' variant='outlined'>
                Cancel
              </ConfirmPopup.Reject>

              <ConfirmPopup.Accept severity='danger' onClick={() => handleDeleteQuiz()}>
                Confirm
                {isDeleting && <i className='pi pi-spin pi-spinner ml-2' />}
              </ConfirmPopup.Accept>
            </ConfirmPopup.Footer>
          </ConfirmPopup.Portal>
        </ConfirmPopup.Root>
      </div>
    </div>
  );
}
