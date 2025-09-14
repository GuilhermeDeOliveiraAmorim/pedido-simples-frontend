import { useMutation } from "@tanstack/react-query";
import {
  LoginInputDto,
  LoginOutputDto,
  RequestLoginChangeInputDto,
  RequestLoginChangeOutputDto,
  ConfirmLoginChangeInputDto,
  ConfirmLoginChangeOutputDto,
} from "@/core/entities/Auth";
import { UseCasesFactory } from "../infra/UseCasesFactory";
import { ApiError } from "../infra/Http";

const { auth } = UseCasesFactory();

export function useLogin() {
  return useMutation<LoginOutputDto, ApiError, LoginInputDto>({
    mutationFn: async (input) => {
      return await auth.login.execute(input);
    },
  });
}

export function useRequestLoginChange() {
  return useMutation<
    RequestLoginChangeOutputDto,
    ApiError,
    RequestLoginChangeInputDto
  >({
    mutationFn: async (input) => {
      return await auth.requestChange.execute(input);
    },
  });
}

export function useConfirmLoginChange() {
  return useMutation<
    ConfirmLoginChangeOutputDto,
    ApiError,
    ConfirmLoginChangeInputDto
  >({
    mutationFn: async (input) => {
      return await auth.confirmChange.execute(input);
    },
  });
}
