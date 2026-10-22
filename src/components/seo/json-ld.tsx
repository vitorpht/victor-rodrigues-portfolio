type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Dados estruturados renderizados no HTML do servidor (visíveis para crawlers sem JavaScript). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado para impedir o fecho prematuro da tag <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
