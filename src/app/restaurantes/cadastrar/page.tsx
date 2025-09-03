"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type RestaurantPayload = {
  city: string;
  email: string;
  name: string;
  neighborhood: string;
  number: string;
  phone: string;
  picture: string;
  street: string;
  zip_code: string;
};

async function postRestaurant(data: RestaurantPayload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const message =
      errorData?.errors?.[0]?.detail || "Erro ao cadastrar restaurante";
    throw new Error(message);
  }

  return res.json();
}

export default function CadastrarRestaurante() {
  const [form, setForm] = useState({
    city: "",
    email: "",
    name: "",
    neighborhood: "",
    number: "",
    phone: "",
    picture: "",
    street: "",
    zip_code: "",
  });

  const mutation = useMutation({
    mutationFn: postRestaurant,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Restaurante cadastrado com sucesso!");
      setForm({
        city: "",
        email: "",
        name: "",
        neighborhood: "",
        number: "",
        phone: "",
        picture: "",
        street: "",
        zip_code: "",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Cadastrar Restaurante</h1>

      {mutation.isPending ? (
        // skeleton enquanto espera a response
        <div className="space-y-4 mt-4">
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
          }}
        >
          <Input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Input
            name="picture"
            placeholder="URL da Foto"
            value={form.picture}
            onChange={handleChange}
          />
          <Input
            name="street"
            placeholder="Rua"
            value={form.street}
            onChange={handleChange}
            required
          />
          <Input
            name="number"
            placeholder="Número"
            value={form.number}
            onChange={handleChange}
            required
          />
          <Input
            name="neighborhood"
            placeholder="Bairro"
            value={form.neighborhood}
            onChange={handleChange}
            required
          />
          <Input
            name="city"
            placeholder="Cidade"
            value={form.city}
            onChange={handleChange}
            required
          />
          <Input
            name="zip_code"
            placeholder="CEP"
            value={form.zip_code}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      )}
    </div>
  );
}
