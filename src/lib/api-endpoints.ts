import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/utils/api-constants';
import { ApiResponse } from '@/interfaces/common/api-response-interface';
import { CreateQuiz } from '@/types/quiz/create-quiz';
import { ReturnQuiz } from '@/types/quiz/return-quiz';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
});

export const ApiEndpoints = createApi({
  reducerPath: 'ApiEndpoints',
  baseQuery: baseQuery,
  tagTypes: ['QuizList'],
  endpoints: (build) => ({
    appHealthCheck: build.query<void, void>({
      query: () => ({ url: `/api` }),
    }),

    quizCreate: build.mutation<ApiResponse<ReturnQuiz>, CreateQuiz>({
      query: (queryArg) => ({
        url: `/api/quizzes`,
        method: 'POST',
        body: queryArg,
      }),
      invalidatesTags: ['QuizList'],
    }),
    quizFindById: build.query<ApiResponse<ReturnQuiz>, { id: string }>({
      query: (queryArg) => ({
        url: `/api/quizzes/${queryArg.id}`,
      }),
      providesTags: ['QuizList'],
    }),
    quizFindAll: build.query<
      ApiResponse<(Omit<ReturnQuiz, 'questions'> & { questionCount: number })[]>,
      void
    >({
      query: () => `/api/quizzes`,
      providesTags: ['QuizList'],
    }),
    quizDeleteById: build.mutation<ApiResponse<number>, string>({
      query: (queryArg) => ({
        url: `/api/quizzes/${queryArg}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['QuizList'],
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useAppHealthCheckQuery,
  useQuizCreateMutation,
  useQuizFindAllQuery,
  useQuizFindByIdQuery,
  useQuizDeleteByIdMutation,
} = ApiEndpoints;
