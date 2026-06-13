import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function RootNotFound() {
  return (
    <html lang="pt">
      <body className="flex min-h-dvh items-center justify-center bg-background text-foreground antialiased">
        <div className="text-center">
          <p className="text-6xl font-bold text-sky-500">404</p>
          <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
          <Link href="/pt" className={buttonVariants({ className: "mt-8 inline-flex" })}>
            Voltar ao início
          </Link>
        </div>
      </body>
    </html>
  );
}
