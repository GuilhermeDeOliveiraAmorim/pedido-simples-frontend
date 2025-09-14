import {
  ConfirmLoginChangeInputDto,
  ConfirmLoginChangeOutputDto,
  LoginInputDto,
  LoginOutputDto,
  RequestLoginChangeInputDto,
  RequestLoginChangeOutputDto,
} from "../entities/Auth";

export interface AuthInterfaceRepository {
  login(input: LoginInputDto): Promise<LoginOutputDto>;
  requestLoginChange(
    input: RequestLoginChangeInputDto
  ): Promise<RequestLoginChangeOutputDto>;
  confirmLoginChange(
    input: ConfirmLoginChangeInputDto
  ): Promise<ConfirmLoginChangeOutputDto>;
}
