/**
 * Design tokens exclusivos do PDF — não partilhar com o website.
 * A4: 595.28 × 841.89 pt
 */
export const PDF_PAGE = {
  width: 595.28,
  height: 841.89,
  marginTop: 32,
  marginBottom: 32,
  marginHorizontal: 42,
} as const;

export const PDF_CONTENT_WIDTH =
  PDF_PAGE.width - PDF_PAGE.marginHorizontal * 2;

export const PDF_GRID = {
  gutter: 12,
  sectionGap: 14,
  blockGap: 7,
  lineGap: 4,
  columns: 12,
} as const;

export const PDF_TYPE = {
  name: 20,
  role: 10.5,
  section: 9,
  body: 8.5,
  bodySmall: 8,
  meta: 7.5,
  label: 7,
  stat: 9,
} as const;

export const PDF_COLOR = {
  text: "#111827",
  textBody: "#374151",
  textMuted: "#6b7280",
  rule: "#d1d5db",
  ruleLight: "#e5e7eb",
  accent: "#1e40af",
} as const;

export const PDF_FONT = {
  regular: "Helvetica",
  bold: "Helvetica-Bold",
} as const;

export const PDF_COL = {
  full: "100%",
  half: "50%",
  third: "33.333%",
  twoThirds: "66.666%",
  quarter: "25%",
} as const;

export function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

export function splitInHalf<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

/** Formata stats FlowJersey numa linha compacta (poupa altura vs grelha). */
export function formatStatsInline(
  stats: { value?: string; label: string }[],
): string {
  return stats
    .map((s) => (s.value ? `${s.value} ${s.label}` : s.label))
    .join("  ·  ");
}
