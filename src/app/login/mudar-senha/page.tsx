"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRequestLoginChange } from "@/core/hooks/useAuth";
import { RequestLoginChangeInputDto } from "@/core/entities/Auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { passwordChecks } from "@/lib/utils";

export default function RequestLoginChangeForm() {
  const mutation = useRequestLoginChange();
  const [form, setForm] = useState<RequestLoginChangeInputDto>({
    change_type: "password",
    login: {
      email: "",
      password: "",
    },
    new_value: "",
    user_type: "",
  });

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

    const allValid = passwordChecks.every((rule) => rule.check(form.new_value));
    if (!allValid) {
      toast.error("A nova senha não atende aos requisitos de segurança.");
      return;
    }

    mutation.mutate(form, {
      onSuccess: (data) => {
        toast.success(data.content_message || "Solicitação enviada!");
        setForm({
          change_type: "password",
          login: { email: "", password: "" },
          new_value: "",
          user_type: "",
        });
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
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

          {/* checklist visual */}
          {form.new_value && (
            <div className="mt-3 space-y-1 text-sm">
              {passwordChecks.map(({ check, label }) => {
                const ok = check(form.new_value);
                return (
                  <div key={label} className="flex items-center gap-2">
                    {ok ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={ok ? "text-green-600" : "text-red-500"}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
