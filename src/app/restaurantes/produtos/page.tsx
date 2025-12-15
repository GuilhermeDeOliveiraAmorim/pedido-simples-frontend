"use client";

import React from "react";
import { useAuthGuard } from "@/core/hooks/useAuth";
import { useGetProducts } from "@/core/hooks/useGetProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageLoadingProgress from "@/components/PageLoadingProgress";

export default function ProdutosPage() {
  const ready = useAuthGuard("restaurant");
  const { data, isLoading, isError, error } = useGetProducts();

  if (!ready) {
    return <PageLoadingProgress className="animate-pulse" value={100} />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">
            Erro ao carregar produtos
          </h2>
          <p className="text-red-600 text-sm mt-1">
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </p>
        </div>
      </div>
    );
  }

  const products = data?.products || [];
  const total = data?.total || 0;

  return (
    <main className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-gray-600 mt-1">
            {total} produto{total !== 1 ? "s" : ""} cadastrado
            {total !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/restaurantes/produtos/cadastrar">
          <Button>Novo Produto</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Nenhum produto cadastrado ainda.</p>
          <Link href="/restaurantes/produtos/cadastrar">
            <Button>Cadastrar Primeiro Produto</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    R$ {product.price.toFixed(2)}
                  </p>
                  {product.pictures && product.pictures.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      <p className="text-xs text-gray-500 w-full mb-1">
                        Imagens ({product.pictures.length}):
                      </p>
                      {product.pictures.map((pic, idx) => {
                        const imageUrl = pic.startsWith("http")
                          ? pic
                          : `${process.env.NEXT_PUBLIC_STORAGE_URL}/${pic}`;
                        return (
                          <div
                            key={idx}
                            className="w-16 h-16 bg-gray-100 rounded border"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imageUrl}
                              alt={`${product.name} - imagem ${idx + 1}`}
                              className="w-full h-full object-cover rounded"
                              onError={(e) => {
                                console.error(
                                  "Erro ao carregar imagem:",
                                  imageUrl
                                );
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
