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

export type Product = {
  id: string;
  name: string;
  price: number;
  pictures?: string[];
  active: boolean;
  restaurant_id?: string;
};

export type GetProductsResponse = {
  products: Product[];
  total: number;
};

export async function getProducts(): Promise<GetProductsResponse> {
  try {
    const { data } = await http.get<GetProductsResponse>(
      `/restaurants/products`
    );
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Erro ao buscar produtos");
  }
}

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
