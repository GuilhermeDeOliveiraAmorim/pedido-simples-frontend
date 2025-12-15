"use client";

import React, { useState } from "react";
import { useCreateRestaurant } from "@/core/hooks/useCreateRestaurant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function CadastrarRestaurantePublico() {
  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "Brasil",
    complement: "",
    email: "",
    name: "",
    neighborhood: "",
    number: "",
    country_code: "55",
    area_code: "",
    phone: "",
    password: "",
    picture: "",
    street: "",
    zip_code: "",
  });
  const mutation = useCreateRestaurant();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        name: form.name,
        login: { email: form.email, password: form.password },
        phone: {
          country_code: form.country_code,
          area_code: form.area_code,
          number: form.phone,
        },
        address: {
          street: form.street,
          number: form.number,
          neighborhood: form.neighborhood,
          city: form.city,
          zip_code: form.zip_code,
          complement: form.complement || undefined,
          state: form.state || undefined,
          country: form.country || undefined,
        },
        picture: form.picture,
      },
      {
        onSuccess: () => {
          toast.success("Restaurante cadastrado com sucesso!");
          setForm({
            city: "",
            state: "",
            country: "Brasil",
            complement: "",
            email: "",
            name: "",
            neighborhood: "",
            number: "",
            country_code: "55",
            area_code: "",
            phone: "",
            password: "",
            picture: "",
            street: "",
            zip_code: "",
          });
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Cadastrar Restaurante</h1>

      {mutation.isPending ? (
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
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <Input
              name="country_code"
              placeholder="Código do País"
              value={form.country_code}
              onChange={handleChange}
              required
            />
            <Input
              name="area_code"
              placeholder="DDD"
              value={form.area_code}
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
          </div>
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
          <div className="flex gap-2">
            <Input
              name="state"
              placeholder="Estado (UF)"
              value={form.state}
              onChange={handleChange}
            />
            <Input
              name="country"
              placeholder="País"
              value={form.country}
              onChange={handleChange}
            />
          </div>
          <Input
            name="complement"
            placeholder="Complemento (Apto, Bloco, ... )"
            value={form.complement}
            onChange={handleChange}
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
