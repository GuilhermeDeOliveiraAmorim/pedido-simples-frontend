"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogin } from "@/core/hooks/useAuth";
import { LoginInputDto } from "@/core/entities/Auth";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const initialState: LoginInputDto = {
    login: { email: "", password: "" },
    user_type: "restaurant",
  };
  const router = useRouter();
  const mutation = useLogin();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<LoginInputDto>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email" || name === "password") {
      setForm({ ...form, login: { ...form.login, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: (data) => {
        setCookie(null, "access_token", data.access_token, { path: "/" });
        setCookie(null, "user_type", form.user_type, { path: "/" });

        queryClient.setQueryData(["access_token"], data.access_token);
        queryClient.setQueryData(["user_type"], form.user_type);

        toast.success(data.content_message || "Login realizado com sucesso", {
          description: "Redirecionando...",
        });

        setForm(initialState);

        if (form.user_type === "restaurant") {
          router.push("/restaurantes/");
        } else if (form.user_type === "customer") {
          router.push("/clientes/");
        } else {
          router.push("/login");
        }
      },
      onError: (error) => {
        toast.error(error.message, {
          description: error.message || "Tente novamente mais tarde.",
        });
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
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      )}
    </div>
  );
}
