import { Document, Page, View } from "@react-pdf/renderer";
import type { CvData } from "@/lib/cv/build-cv-data";
import { pdfStyles } from "@/lib/cv/pdf/styles";
import { CvPdfPageOne } from "./pdf/cv-pdf-page-one";
import { CvPdfPageTwo } from "./pdf/cv-pdf-page-two";

type CvPdfDocumentProps = {
  data: CvData;
  photoSrc?: string;
};

/**
 * Currículo PDF — layout dedicado A4 (2 páginas).
 * Independente do website; optimizado para impressão e ATS.
 */
export function CvPdfDocument({ data, photoSrc }: CvPdfDocumentProps) {
  return (
    <Document
      title={`${data.name} — CV`}
      author={data.name}
      subject={data.title}
      creator="Victor Rodrigues Portfolio"
    >
      {/* Um único Page + break evita página órfã quando a pág. 1 transborda */}
      <Page size="A4" style={pdfStyles.page}>
        <CvPdfPageOne data={data} photoSrc={photoSrc} />
        <View break />
        <CvPdfPageTwo data={data} />
      </Page>
    </Document>
  );
}
