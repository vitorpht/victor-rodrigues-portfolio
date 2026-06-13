import { Link, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { pdfStyles as s } from "./styles";

type PdfSectionProps = {
  title: string;
  children: ReactNode;
  wrap?: boolean;
};

/** Secção com título normalizado — unidade base do layout PDF */
export function PdfSection({ title, children, wrap = true }: PdfSectionProps) {
  return (
    <View style={s.section} wrap={wrap}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

type PdfTwoColRowProps = {
  left: ReactNode;
  right: ReactNode;
};

/** Linha 50/50 com gutter fixo */
export function PdfTwoColRow({ left, right }: PdfTwoColRowProps) {
  return (
    <View style={s.row} wrap={false}>
      <View style={s.colHalfLeft}>{left}</View>
      <View style={s.colHalfRight}>{right}</View>
    </View>
  );
}

type PdfContactGridProps = {
  rows: { label: string; display: string; url: string }[][];
};

function ContactCell({ item }: { item: { label: string; display: string; url: string } }) {
  return (
    <Link src={item.url} style={s.contactLink}>
      <Text style={s.contactText}>
        <Text style={s.contactLabel}>{item.label}: </Text>
        <Text style={s.contactValue}>{item.display}</Text>
      </Text>
    </Link>
  );
}

/** Grelha de contactos 2×N com hiperligações clicáveis */
export function PdfContactGrid({ rows }: PdfContactGridProps) {
  return (
    <View style={s.contactGrid}>
      {rows.map((pair, i) => (
        <View key={`contact-${i}`} style={s.contactRow}>
          <View style={s.contactCellLeft}>{pair[0] ? <ContactCell item={pair[0]} /> : null}</View>
          <View style={s.contactCellRight}>{pair[1] ? <ContactCell item={pair[1]} /> : null}</View>
        </View>
      ))}
    </View>
  );
}

type PdfStackColumnsProps = {
  left: ReactNode;
  right: ReactNode;
};

/** Duas colunas empilhadas independentemente (certificações, stack) */
export function PdfStackColumns({ left, right }: PdfStackColumnsProps) {
  return (
    <View style={s.row}>
      <View style={[s.stackColumn, s.stackColumnLeft]}>{left}</View>
      <View style={[s.stackColumn, s.stackColumnRight]}>{right}</View>
    </View>
  );
}