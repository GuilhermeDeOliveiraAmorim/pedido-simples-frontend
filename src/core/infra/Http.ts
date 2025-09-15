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

export interface ProblemDetailsResponse {
  errors: ProblemDetails[];
}

export class ApiError extends Error {
  constructor(public problems: ProblemDetails[]) {
    super(problems.map((p) => p.detail).join("\n"));
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
    if (isAxiosError<ProblemDetailsResponse>(error) && error.response?.data) {
      console.error("[HTTP RESPONSE ERROR]", error.response.data);

      const problems = error.response.data.errors || [];
      return Promise.reject(new ApiError(problems));
    }

    console.error("[HTTP ERROR]", error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError<ProblemDetailsResponse>(error) && error.response?.data) {
      console.error("[HTTP RESPONSE ERROR]", error.response.data);

      const problems = error.response.data.errors || [];
      return Promise.reject(new ApiError(problems));
    }

    console.error("[HTTP ERROR]", error);
    return Promise.reject(error);
  }
);
