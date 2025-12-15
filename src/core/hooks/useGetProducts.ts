"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, GetProductsResponse } from "@/core/services/products";
import { ApiError } from "@/core/infra/Http";

export function useGetProducts() {
  return useQuery<GetProductsResponse, ApiError | Error>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}
