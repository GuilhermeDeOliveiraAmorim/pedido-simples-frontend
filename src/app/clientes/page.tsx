"use client";

import PageLoadingProgress from "@/components/PageLoadingProgress";
import { useAuthGuard } from "@/core/hooks/useAuth";

export default function Customer() {
  const ready = useAuthGuard("customer");

  if (!ready) {
    return <PageLoadingProgress className="animate-pulse" value={100} />;
  }

  return <div>Clientes</div>;
}
