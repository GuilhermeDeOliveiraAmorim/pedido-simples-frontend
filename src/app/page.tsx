"use client"

import { useQuery } from "@tanstack/react-query";

async function fetchHealth() {
  const res = await fetch("http://localhost:8080/health");
  if (!res.ok) throw new Error("Erro na API");
  return res.json();
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar</p>;

  return <p>Status: {data.status}</p>;
}
