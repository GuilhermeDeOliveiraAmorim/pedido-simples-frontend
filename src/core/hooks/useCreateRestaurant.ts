"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createRestaurant,
  CreateRestaurantPayload,
  CreateRestaurantResponse,
} from "@/core/services/restaurants";

export function useCreateRestaurant() {
  return useMutation<CreateRestaurantResponse, Error, CreateRestaurantPayload>({
    mutationFn: (payload) => createRestaurant(payload),
  });
}
