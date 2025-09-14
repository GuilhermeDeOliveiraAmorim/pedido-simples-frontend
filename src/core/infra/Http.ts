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

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.error("[HTTP REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError<ProblemDetails>(error) && error.response?.data) {
      console.error("[HTTP RESPONSE ERROR]", error.response.data);
      return Promise.reject(new ApiError(error.response.data));
    }
    console.error("[HTTP ERROR]", error);
    return Promise.reject(error);
  }
);
