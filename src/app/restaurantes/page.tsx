"use client";

import PageLoadingProgress from "@/components/PageLoadingProgress";
import { useAuthGuard } from "@/core/hooks/useAuth";

export default function Restaurant() {
  const ready = useAuthGuard("restaurant");

  if (!ready) {
    return (
      <div aria-busy="true" aria-live="polite">
        <PageLoadingProgress className="animate-pulse" value={100} />
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-xl font-semibold">Restaurantes</h1>
      <p className="text-sm text-muted-foreground">
        Gerencie seus restaurantes e cadastros.
      </p>
    </main>
  );
}
