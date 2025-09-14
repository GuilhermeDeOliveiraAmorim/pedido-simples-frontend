import { LoginOutputDto, LoginInputDto } from "../entities/Auth";
import { AuthInterfaceRepository } from "../repositories/AuthInterfaceRepository";

export class LoginUseCase {
  constructor(private authRepository: AuthInterfaceRepository) {}

  async execute(input: LoginInputDto): Promise<LoginOutputDto> {
    return await this.authRepository.login(input);
  }
}
