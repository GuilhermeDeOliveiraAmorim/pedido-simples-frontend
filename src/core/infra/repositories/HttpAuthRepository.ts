import {
  ConfirmLoginChangeInputDto,
  ConfirmLoginChangeOutputDto,
  LoginInputDto,
  LoginOutputDto,
  RequestLoginChangeInputDto,
  RequestLoginChangeOutputDto,
} from "@/core/entities/Auth";
import { AuthInterfaceRepository } from "@/core/repositories/AuthInterfaceRepository";
import { http } from "../Http";

export class HttpAuthRepository implements AuthInterfaceRepository {
  constructor(private httpClient = http) {}

  async login(input: LoginInputDto): Promise<LoginOutputDto> {
    const response = await this.httpClient.post<LoginOutputDto>(
      "/auth/login",
      input
    );
    return response.data;
  }

  async requestLoginChange(
    input: RequestLoginChangeInputDto
  ): Promise<RequestLoginChangeOutputDto> {
    const response = await this.httpClient.post<RequestLoginChangeOutputDto>(
      "/auth/change/request",
      input
    );
    return response.data;
  }

  async confirmLoginChange(
    input: ConfirmLoginChangeInputDto
  ): Promise<ConfirmLoginChangeOutputDto> {
    const response = await this.httpClient.post<ConfirmLoginChangeOutputDto>(
      "/auth/change/confirm",
      input
    );
    return response.data;
  }
}
