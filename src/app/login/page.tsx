"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogin } from "@/core/hooks/useAuth";
import { LoginInputDto } from "@/core/entities/Auth";

export default function LoginForm() {
  const [form, setForm] = useState<LoginInputDto>({
    login: {
      email: "",
      password: "",
    },
    user_type: "",
  });

  const mutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email" || name === "password") {
      setForm({
        ...form,
        login: {
          ...form.login,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: (data) => {
        toast.success("Login realizado com sucesso!");
        console.log("Access token:", data.access_token);
      },
      onError: (error) => {
        toast.error(error.message || "Erro ao realizar login");
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Login</h1>

      {mutation.isPending ? (
        <div className="space-y-4 mt-4">
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
            name="email"
            type="email"
            placeholder="Email"
            value={form.login.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.login.password}
            onChange={handleChange}
            required
          />
          <Input
            name="user_type"
            placeholder="Tipo de usuário"
            value={form.user_type}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      )}
    </div>
  );
}
