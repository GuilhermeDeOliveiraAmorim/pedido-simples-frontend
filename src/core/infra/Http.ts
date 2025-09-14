import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function isAxiosError<T = unknown>(
  error: unknown
): error is { isAxiosError: boolean; response?: { data?: T } } {
  return (
    (error as unknown as { isAxiosError?: boolean })?.isAxiosError === true
  );
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export class ApiError extends Error {
  constructor(public problem: ProblemDetails) {
    super(problem.detail);
    this.name = "ApiError";
  }
}
