import { Text, View } from "@react-pdf/renderer";
import type { CvData, CvSkillCard } from "@/lib/cv/build-cv-data";
import { PdfSection, PdfTwoColRow } from "@/lib/cv/pdf/primitives";
import { pdfStyles as s } from "@/lib/cv/pdf/styles";
import { chunk } from "@/lib/cv/pdf/tokens";
import { CvPdfHeader } from "./cv-pdf-header";

type CvPdfPageOneProps = {
  data: CvData;
  photoSrc?: string;
};

export function CvPdfPageOne({ data, photoSrc }: CvPdfPageOneProps) {
  const skillRows = chunk(data.keySkillCards, 2);

  return (
    <>
      <CvPdfHeader data={data} photoSrc={photoSrc} />

      <PdfSection title={data.sections.summary}>
        {data.summary.map((paragraph, i) => (
          <Text
            key={paragraph.slice(0, 32)}
            style={[s.paragraph, i === data.summary.length - 1 ? s.paragraphLast : {}]}
          >
            {paragraph}
          </Text>
        ))}
      </PdfSection>

      <PdfSection title={data.sections.keySkills}>
        {skillRows.map((row, i) => (
          <PdfTwoColRow
            key={`skill-row-${i}`}
            left={row[0] ? <SkillCell skill={row[0]} /> : <View />}
            right={row[1] ? <SkillCell skill={row[1]} /> : <View />}
          />
        ))}
      </PdfSection>
    </>
  );
}

function SkillCell({ skill }: { skill: CvSkillCard }) {
  return (
    <View style={s.skillItem}>
      <Text style={s.skillTitle}>{skill.title}</Text>
      <Text style={s.skillDesc}>{skill.description}</Text>
    </View>
  );
}
