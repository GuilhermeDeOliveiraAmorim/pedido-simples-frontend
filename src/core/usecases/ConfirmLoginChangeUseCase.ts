import {
  ConfirmLoginChangeInputDto,
  ConfirmLoginChangeOutputDto,
} from "../entities/Auth";
import { AuthInterfaceRepository } from "../repositories/AuthInterfaceRepository";

export class ConfirmLoginChangeUseCase {
  constructor(private authRepository: AuthInterfaceRepository) {}

  async execute(
    input: ConfirmLoginChangeInputDto
  ): Promise<ConfirmLoginChangeOutputDto> {
    return await this.authRepository.confirmLoginChange(input);
  }
}
