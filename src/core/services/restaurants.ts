export type CreateRestaurantPayload = {
  name: string;
  login: { email: string; password: string };
  phone: { country_code: string; area_code: string; number: string };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zip_code: string;
    complement?: string;
    state?: string;
    country?: string;
  };
  picture: string;
};

export type CreateRestaurantResponse = {
  success_message: string;
  content_message: string;
};

export async function createRestaurant(
  payload: CreateRestaurantPayload
): Promise<CreateRestaurantResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(`${baseUrl}/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Erro ao criar restaurante";
    try {
      const data = await res.json();
      message = data?.errors?.[0]?.detail || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}
