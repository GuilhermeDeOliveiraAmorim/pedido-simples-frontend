"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useConfirmLoginChange } from "@/core/hooks/useAuth";
import { setCookie } from "nookies";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConfirmLoginChangePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const mutation = useConfirmLoginChange();

  // flag para evitar chamadas duplicadas
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    mutation.mutate(
      { confirmation_token: token },
      {
        onSuccess: (data) => {
          setCookie(null, "access_token", data.access_token, { path: "/" });
          setCookie(null, "user_type", data.user_type, { path: "/" });

          toast.success(
            data.success_message || "Mudança confirmada com sucesso!",
            {
              description: data.content_message || "",
            }
          );

          if (data.user_type === "restaurant") router.push("/restaurantes");
          else if (data.user_type === "customer") router.push("/clientes");
          else router.push("/dashboard");
        },
        onError: (error) => {
          toast.error(error.message || "Não foi possível confirmar a mudança", {
            description: error?.problems?.map((p) => p.detail).join(", ") || "",
          });
          router.push("/login");
        },
      }
    );
  }, [token, mutation, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {mutation.isPending ? (
        <div className="space-y-4">
          <Skeleton className="h-[36px] w-[200px] rounded-md" />
          <Skeleton className="h-[36px] w-[200px] rounded-md" />
        </div>
      ) : (
        <p>Processando confirmação...</p>
      )}
    </div>
  );
}
