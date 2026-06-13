import { Image, Text, View } from "@react-pdf/renderer";
import type { CvData } from "@/lib/cv/build-cv-data";
import { getInitials } from "@/lib/cv/resolve-cv-photo";
import { PdfContactGrid } from "@/lib/cv/pdf/primitives";
import { pdfStyles as s } from "@/lib/cv/pdf/styles";
import { chunk } from "@/lib/cv/pdf/tokens";

type CvPdfHeaderProps = {
  data: CvData;
  photoSrc?: string;
};

export function CvPdfHeader({ data, photoSrc }: CvPdfHeaderProps) {
  const contactRows = chunk(
    data.links.map((l) => ({ label: l.label, display: l.display, url: l.url })),
    2,
  );

  const initials = getInitials(data.name);

  return (
    <View style={s.header}>
      <View style={s.headerRow}>
        <View style={s.headerTextCol}>
          <View style={s.nameBlock}>
            <Text style={s.name}>{data.name}</Text>
          </View>
          <View style={s.roleBlock}>
            <Text style={s.role}>{data.title}</Text>
          </View>
        </View>

        <View style={s.avatarWrap}>
          {photoSrc ? (
            <Image src={photoSrc} style={s.avatarImage} />
          ) : (
            <View style={s.avatarFallback}>
              <Text style={s.avatarInitials}>{initials}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={s.contactSection}>
        <PdfContactGrid rows={contactRows} />
      </View>
    </View>
  );
}
