import { ConfirmLoginChangeUseCase } from "../usecases/ConfirmLoginChangeUseCase";
import { LoginUseCase } from "../usecases/LoginUseCase";
import { RequestLoginChangeUseCase } from "../usecases/RequestLoginChangeUseCase";
import { http } from "./Http";
import { HttpAuthRepository } from "./repositories/HttpAuthRepository";

export function UseCasesFactory() {
  const httpAuthRepository = new HttpAuthRepository(http);

  const auth = {
    login: new LoginUseCase(httpAuthRepository),
    requestChange: new RequestLoginChangeUseCase(httpAuthRepository),
    confirmChange: new ConfirmLoginChangeUseCase(httpAuthRepository),
  };

  return {
    auth,
  };
}
