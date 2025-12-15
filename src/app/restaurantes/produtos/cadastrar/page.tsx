"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateProduct } from "@/core/hooks/useCreateProduct";
import { toast } from "sonner";
import PageLoadingProgress from "@/components/PageLoadingProgress";
import { useAuthGuard } from "@/core/hooks/useAuth";
import { parseCookies } from "nookies";
import { useQueryClient } from "@tanstack/react-query";

function parsePictures(input: string): string[] | undefined {
  const items = input
    .split(/\r?\n|,/) // separa por linha ou vírgula
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

export default function CadastrarProdutoSemIdNaUrl() {
  const ready = useAuthGuard("restaurant");
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    price: "",
    picturesText: "",
  });

  const mutation = useCreateProduct();

  const canSubmit = useMemo(() => {
    const priceNum = Number(form.price);
    return !!form.name && !Number.isNaN(priceNum) && priceNum > 0;
  }, [form.name, form.price]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const price = Number(form.price);
    const pictures = parsePictures(form.picturesText);

    // Opcional: enviar restaurant_id caso o backend ainda exija no corpo
    const cookies = parseCookies();
    const restaurant_id = cookies.restaurant_id || cookies.user_id;

    mutation.mutate(
      { name: form.name, price, pictures, restaurant_id },
      {
        onSuccess: () => {
          toast.success("Produto criado com sucesso!");
          setForm({ name: "", price: "", picturesText: "" });
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  if (!ready) {
    return <PageLoadingProgress className="animate-pulse" value={100} />;
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h1 className="text-xl font-semibold">Cadastrar Produto</h1>

      {mutation.isPending ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-full rounded-md" />
          <Skeleton className="h-[72px] w-full rounded-md" />
          <Skeleton className="h-[36px] w-28 rounded-md" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <Input
            name="name"
            placeholder="Nome do produto"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Preço (ex: 29.90)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="picturesText"
            placeholder="URLs das imagens (uma por linha ou separadas por vírgula)"
            value={form.picturesText}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 min-h-[72px]"
          />
          <Button type="submit" disabled={!canSubmit || mutation.isPending}>
            {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      )}
    </div>
  );
}
