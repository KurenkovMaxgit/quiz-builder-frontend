'use client';

import { use } from 'react';
import { QuizCreationForm } from '@/components/quizzes/quizzes-creation-form';
import { useQuizFindByIdQuery } from '@/lib/api-endpoints';

export default function QuizDetailsPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);

  const {
    data: fetchedQuiz,
    isLoading,
    isError,
  } = useQuizFindByIdQuery({ id: resolvedParams.quizId });

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <i className='pi pi-spin pi-spinner text-primary-500 text-4xl' />
      </div>
    );
  }
  if (isError || !fetchedQuiz) {
    return (
      <div className='flex h-64 items-center justify-center font-bold text-red-500'>
        Failed to load quiz.
      </div>
    );
  }

  return <QuizCreationForm initialQuiz={fetchedQuiz.data!} readOnly={true} />;
}
