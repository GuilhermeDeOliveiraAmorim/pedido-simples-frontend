import {
  RequestLoginChangeInputDto,
  RequestLoginChangeOutputDto,
} from "../entities/Auth";
import { AuthInterfaceRepository } from "../repositories/AuthInterfaceRepository";

export class RequestLoginChangeUseCase {
  constructor(private authRepository: AuthInterfaceRepository) {}

  async execute(
    input: RequestLoginChangeInputDto
  ): Promise<RequestLoginChangeOutputDto> {
    return await this.authRepository.requestLoginChange(input);
  }
}
