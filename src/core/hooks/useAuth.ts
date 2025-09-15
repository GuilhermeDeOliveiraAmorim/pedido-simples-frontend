import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { data: token, isFetching: tokenLoading } = useAccessToken();
  const { data: userType, isFetching: userTypeLoading } = useUserType();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (tokenLoading || userTypeLoading) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (userType !== requiredUserType) {
      router.replace("/unauthorized");
      return;
    }

    setReady(true);
  }, [
    token,
    userType,
    tokenLoading,
    userTypeLoading,
    router,
    requiredUserType,
  ]);

  return ready;
}

export function useAccessToken() {
  return useQuery<string | null>({
    queryKey: ["access_token"],
    queryFn: () => localStorage.getItem("access_token"),
    staleTime: Infinity,
  });
}

export function useUserType() {
  return useQuery<string | null>({
    queryKey: ["user_type"],
    queryFn: () => localStorage.getItem("user_type"),
    staleTime: Infinity,
  });
}
