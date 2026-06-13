import { renderToBuffer } from "@react-pdf/renderer";
import { CvPdfDocument } from "@/components/cv/cv-pdf-document";
import type { CvData } from "@/lib/cv/build-cv-data";
import { resolveCvPhotoSrc } from "@/lib/cv/resolve-cv-photo";

export async function generateCvPdfBuffer(data: CvData): Promise<Buffer> {
  const photoSrc = resolveCvPhotoSrc();
  return renderToBuffer(<CvPdfDocument data={data} photoSrc={photoSrc} />);
}
