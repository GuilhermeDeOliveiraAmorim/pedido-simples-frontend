/**
 * Utilitário para gerar URLs de imagens do Google Cloud Storage
 */

const STORAGE_BASE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ||
  "https://storage.googleapis.com/you-choose";

/**
 * Gera a URL completa para uma imagem do storage
 * @param imageId - ID da imagem ou URL completa
 * @returns URL completa da imagem
 */
export function getImageUrl(imageId: string): string {
  if (!imageId) {
    return "";
  }

  // Se já é uma URL completa, retorna como está
  if (imageId.startsWith("http://") || imageId.startsWith("https://")) {
    return imageId;
  }

  // Caso contrário, constrói a URL completa
  return `${STORAGE_BASE_URL}/${imageId}`;
}

/**
 * Gera URLs completas para múltiplas imagens
 * @param imageIds - Array de IDs de imagens
 * @returns Array de URLs completas
 */
export function getImageUrls(imageIds: string[]): string[] {
  return imageIds.map(getImageUrl);
}
