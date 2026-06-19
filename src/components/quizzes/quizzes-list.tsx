'use client';

import { QuizListItem } from './quizzes-list-item';
import { UniversalList } from '../common/universal-list/list';
import { ReturnQuizListItem } from '@/types/quiz/return-quiz';
import { Button } from '@primereact/ui/button';
import { CREATE_ROUTE } from '@/utils/router-constants';
import Link from 'next/link';
import { useQuizFindAllQuery } from '@/lib/api-endpoints';

export function QuizzesList() {
  const { data: response, isLoading } = useQuizFindAllQuery();

  const items = response?.data || [];

  return (
    <UniversalList<ReturnQuizListItem>
      items={items}
      isLoading={isLoading}
      itemTemplate={(quiz: ReturnQuizListItem) => <QuizListItem {...quiz} />}
      emptyMessage='No quizzes found'
    >
      <div className='mb-6 flex flex-col gap-4 sm:gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='m-0 text-3xl font-bold'> Quizzes List</h1>

          <Link href={CREATE_ROUTE}>
            <Button raised className='shrink-0'>
              <i className='pi pi-plus sm:mr-2' />
              <span className='hidden font-bold sm:block'>Create</span>
            </Button>
          </Link>
        </div>
      </div>
    </UniversalList>
  );
}
