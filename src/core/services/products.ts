import { http, ApiError } from "@/core/infra/Http";

export type CreateProductPayload = {
  name: string;
  price: number;
  pictures?: string[];
  restaurant_id?: string;
};

export type CreateProductResponse = {
  success_message: string;
  content_message: string;
  id?: string;
};

export async function createProduct(
  payload: CreateProductPayload
): Promise<CreateProductResponse> {
  try {
    const { data } = await http.post<CreateProductResponse>(
      `/restaurants/products`,
      payload
    );
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // mantém mensagens do backend
    }
    throw new Error("Erro ao criar produto");
  }
}
