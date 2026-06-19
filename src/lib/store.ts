import { configureStore } from '@reduxjs/toolkit';
import { ApiEndpoints } from '@/lib/api-endpoints';
import { queryErrorLogger } from '@/middlewares/error-logger';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ApiEndpoints.reducerPath]: ApiEndpoints.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ApiEndpoints.middleware, queryErrorLogger),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
