import { ConfirmLoginChangeUseCase } from "../usecases/ConfirmLoginChangeUseCase";
import { LoginUseCase } from "../usecases/LoginUseCase";
import { RequestLoginChangeUseCase } from "../usecases/RequestLoginChangeUseCase";
import { http } from "./Http";
import { HttpAuthRepository } from "./repositories/HttpAuthRepository";

export function UseCasesFactory() {
  const httpAuthRepository = new HttpAuthRepository(http);

  const loginUseCase = new LoginUseCase(httpAuthRepository);
  const requestLoginChangeUseCase = new RequestLoginChangeUseCase(
    httpAuthRepository
  );
  const confirmLoginChangeUseCase = new ConfirmLoginChangeUseCase(
    httpAuthRepository
  );

  return {
    loginUseCase,
    requestLoginChangeUseCase,
    confirmLoginChangeUseCase,
  };
}
