"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createProduct,
  CreateProductPayload,
  CreateProductResponse,
} from "@/core/services/products";
import { ApiError } from "@/core/infra/Http";

export function useCreateProduct() {
  return useMutation<
    CreateProductResponse,
    ApiError | Error,
    CreateProductPayload
  >({
    mutationFn: (payload) => createProduct(payload),
  });
}
