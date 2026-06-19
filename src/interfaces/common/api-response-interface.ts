export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  details?: unknown;
  data: T | null;
}
