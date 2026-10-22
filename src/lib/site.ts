/** URL pública do site (sem barra final). Definir NEXT_PUBLIC_SITE_URL no ambiente de produção. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev").replace(/\/+$/, "");
