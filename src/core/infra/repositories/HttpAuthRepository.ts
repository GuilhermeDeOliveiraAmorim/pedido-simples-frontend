import {
  ConfirmLoginChangeInputDto,
  ConfirmLoginChangeOutputDto,
  LoginInputDto,
  LoginOutputDto,
  RequestLoginChangeInputDto,
  RequestLoginChangeOutputDto,
} from "@/core/entities/Auth";
import { AuthInterfaceRepository } from "@/core/repositories/AuthInterfaceRepository";
import { ApiError, isAxiosError, ProblemDetails } from "../Http";

export class HttpAuthRepository implements AuthInterfaceRepository {
  constructor(private http: Axios.AxiosInstance) {}

  async login(input: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const response = await this.http.post<LoginOutputDto>(
        "/auth/login",
        input
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<ProblemDetails>(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
      throw error;
    }
  }

  async requestLoginChange(
    input: RequestLoginChangeInputDto
  ): Promise<RequestLoginChangeOutputDto> {
    try {
      const response = await this.http.post<RequestLoginChangeOutputDto>(
        "/auth/change/request",
        input
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<ProblemDetails>(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
      throw error;
    }
  }

  async confirmLoginChange(
    input: ConfirmLoginChangeInputDto
  ): Promise<ConfirmLoginChangeOutputDto> {
    try {
      const response = await this.http.post<ConfirmLoginChangeOutputDto>(
        "/auth/change/confirm",
        input
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<ProblemDetails>(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
      throw error;
    }
  }
}
