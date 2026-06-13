import { Text, View } from "@react-pdf/renderer";
import type { CvCertificationGroup, CvData, CvEducationItem, CvTechnologyGroup } from "@/lib/cv/build-cv-data";
import { PdfSection, PdfStackColumns } from "@/lib/cv/pdf/primitives";
import { pdfStyles as s } from "@/lib/cv/pdf/styles";
import { chunk, splitInHalf } from "@/lib/cv/pdf/tokens";

type CvPdfPageTwoProps = {
  data: CvData;
};

export function CvPdfPageTwo({ data }: CvPdfPageTwoProps) {
  const [stackLeft, stackRight] = splitInHalf(data.technologyGroups);
  const interestRows = chunk(data.interests, 4);

  return (
    <>
      <PdfSection title={data.sections.skills}>
        <PdfStackColumns
          left={<StackColumn groups={stackLeft} />}
          right={<StackColumn groups={stackRight} />}
        />
      </PdfSection>

      <PdfSection title={data.sections.education}>
        {data.educationCurrent.length > 0 && (
          <>
            <Text style={s.subsectionTitle}>{data.sections.educationCurrent}</Text>
            <EducationBlock items={data.educationCurrent} />
          </>
        )}

        {data.educationPlanned.length > 0 && (
          <>
            <Text style={s.subsectionTitle}>{data.sections.educationPlanned}</Text>
            {data.educationPlanned.map((item) => (
              <View key={item.id} style={s.eduEntry}>
                <Text style={s.eduTitle}>
                  {item.title}
                  {item.institution ? ` — ${item.institution}` : ""}
                  {item.status ? ` (${item.status})` : ""}
                </Text>
              </View>
            ))}
          </>
        )}

        {data.educationFutureAreas.length > 0 && (
          <>
            <Text style={s.subsectionTitle}>{data.sections.educationFutureAreas}</Text>
            <Text style={[s.paragraph, s.paragraphLast]}>{data.educationFutureAreas.join(" · ")}</Text>
          </>
        )}
      </PdfSection>

      {(data.certificationsCompleted.items.length > 0 ||
        data.certificationsInProgress.items.length > 0) && (
        <PdfSection title={data.sections.certifications}>
          <PdfStackColumns
            left={<CertColumn group={data.certificationsCompleted} />}
            right={<CertColumn group={data.certificationsInProgress} inProgress />}
          />
        </PdfSection>
      )}

      <PdfSection title={data.sections.languages}>
        {data.languages.map((lang) => (
          <View key={lang.name} style={s.langRow}>
            <Text style={s.langName}>{lang.name}</Text>
            <Text style={s.langLevel}>{lang.level}</Text>
          </View>
        ))}
      </PdfSection>

      {data.interests.length > 0 && (
        <PdfSection title={data.sections.interests}>
          {interestRows.map((row, i) => (
            <Text key={`interest-${i}`} style={[s.interestsLine, i < interestRows.length - 1 ? { marginBottom: 4 } : {}]}>
              {row.join("  ·  ")}
            </Text>
          ))}
        </PdfSection>
      )}
    </>
  );
}

function StackColumn({ groups }: { groups: CvTechnologyGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <View key={group.category} style={s.stackRow}>
          <Text style={s.techCategory}>{group.categoryLabel}</Text>
          <Text style={s.techItems}>{group.items.join(" · ")}</Text>
        </View>
      ))}
    </>
  );
}

function EducationBlock({ items }: { items: CvEducationItem[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item.id} style={s.eduEntry}>
          <Text style={s.eduTitle}>{item.title}</Text>
          <Text style={s.meta}>
            {[item.institution, item.period, item.status].filter(Boolean).join(" · ")}
          </Text>
        </View>
      ))}
    </>
  );
}

function CertColumn({ group, inProgress = false }: { group: CvCertificationGroup; inProgress?: boolean }) {
  if (group.items.length === 0) {
    return <View />;
  }

  return (
    <View>
      <Text style={[s.certGroupLabel, inProgress ? s.certGroupLabelAlt : {}]}>{group.label}</Text>
      {group.items.map((cert) => (
        <View key={cert.id} style={s.certEntry}>
          <Text style={s.certName}>{cert.name}</Text>
          {(cert.issuer || cert.period) && (
            <Text style={s.meta}>{[cert.issuer, cert.period].filter(Boolean).join(" · ")}</Text>
          )}
        </View>
      ))}
    </View>
  );
}
