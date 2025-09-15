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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

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

export function useAuthGuard(requiredUserType: "restaurant" | "customer") {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.access_token;
    const userType = cookies.user_type;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (userType !== requiredUserType) {
      router.replace("/unauthorized");
      return;
    }

    setReady(true);
  }, [router, requiredUserType]);

  return ready;
}
