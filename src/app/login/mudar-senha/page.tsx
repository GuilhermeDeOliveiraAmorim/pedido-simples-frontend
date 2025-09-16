"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRequestLoginChange } from "@/core/hooks/useAuth";
import { RequestLoginChangeInputDto } from "@/core/entities/Auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestLoginChangeForm() {
  const initialState: RequestLoginChangeInputDto = {
    change_type: "password",
    login: { email: "", password: "" },
    new_value: "",
    user_type: "",
  };
  const mutation = useRequestLoginChange();
  const [form, setForm] = useState<RequestLoginChangeInputDto>(initialState);

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

    if (!form.new_value || !form.login.password) {
      toast.error("Preencha a nova senha");
      return;
    }

    mutation.mutate(form, {
      onSuccess: (data) => {
        toast.success(data.content_message || "Solicitação enviada!");
        setForm(initialState);
      },
      onError: (error) => {
        toast.error(error.message, {
          description:
            error.message || "Verifique seus dados e tente novamente",
        });
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Mudar Senha</h1>

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
            placeholder="E-mail atual"
            value={form.login.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha atual"
            value={form.login.password}
            onChange={handleChange}
            required
          />
          <Input
            name="new_value"
            type="password"
            placeholder="Nova senha"
            value={form.new_value}
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
            {mutation.isPending ? "Enviando..." : "Solicitar mudança"}
          </Button>
        </form>
      )}
    </div>
  );
}
