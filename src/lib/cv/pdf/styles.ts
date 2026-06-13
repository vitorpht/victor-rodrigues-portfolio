import { StyleSheet } from "@react-pdf/renderer";
import { PDF_COLOR, PDF_FONT, PDF_GRID, PDF_PAGE, PDF_TYPE } from "./tokens";

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE.marginTop,
    paddingBottom: PDF_PAGE.marginBottom,
    paddingHorizontal: PDF_PAGE.marginHorizontal,
    fontFamily: PDF_FONT.regular,
    fontSize: PDF_TYPE.body,
    lineHeight: 1.42,
    color: PDF_COLOR.text,
  },

  header: {
    marginBottom: PDF_GRID.sectionGap,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLOR.rule,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  nameBlock: {
    marginBottom: 4,
  },
  name: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.name,
    lineHeight: 1.12,
    color: PDF_COLOR.text,
  },
  roleBlock: {
    marginBottom: 0,
  },
  role: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.role,
    lineHeight: 1.3,
    color: PDF_COLOR.accent,
  },
  avatarWrap: {
    width: 58,
    height: 58,
    flexShrink: 0,
  },
  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    objectFit: "cover",
    borderWidth: 1,
    borderColor: PDF_COLOR.rule,
  },
  avatarFallback: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: PDF_COLOR.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontFamily: PDF_FONT.bold,
    fontSize: 18,
    color: PDF_COLOR.accent,
  },
  contactSection: {
    width: "100%",
  },

  contactGrid: {
    width: "100%",
  },
  contactRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: PDF_GRID.lineGap,
  },
  contactCellLeft: {
    width: "50%",
    paddingRight: PDF_GRID.gutter / 2,
  },
  contactCellRight: {
    width: "50%",
    paddingLeft: PDF_GRID.gutter / 2,
  },
  contactText: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textBody,
  },
  contactLink: {
    textDecoration: "none",
  },
  contactValue: {
    color: PDF_COLOR.accent,
  },
  contactLabel: {
    fontFamily: PDF_FONT.bold,
    color: PDF_COLOR.text,
  },

  section: {
    marginBottom: PDF_GRID.sectionGap,
  },
  sectionTitle: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.section,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: PDF_COLOR.text,
    marginBottom: 7,
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: PDF_COLOR.rule,
  },
  subsectionTitle: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.text,
    marginTop: 6,
    marginBottom: 5,
  },
  subsectionInline: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.text,
  },

  paragraph: {
    fontSize: PDF_TYPE.body,
    color: PDF_COLOR.textBody,
    marginBottom: 6,
    textAlign: "left",
  },
  paragraphLast: {
    marginBottom: 0,
  },
  meta: {
    fontSize: PDF_TYPE.meta,
    color: PDF_COLOR.textMuted,
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    width: "100%",
    marginBottom: PDF_GRID.blockGap,
  },
  colHalfLeft: {
    width: "50%",
    paddingRight: PDF_GRID.gutter / 2,
  },
  colHalfRight: {
    width: "50%",
    paddingLeft: PDF_GRID.gutter / 2,
  },
  skillItem: {
    marginBottom: 2,
  },
  skillTitle: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.text,
    marginBottom: 2,
  },
  skillDesc: {
    fontSize: PDF_TYPE.meta,
    color: PDF_COLOR.textMuted,
    lineHeight: 1.38,
  },

  projectBlock: {
    borderLeftWidth: 2,
    borderLeftColor: PDF_COLOR.accent,
    paddingLeft: 10,
  },
  projectName: {
    fontFamily: PDF_FONT.bold,
    fontSize: 10.5,
    color: PDF_COLOR.text,
    marginBottom: 3,
  },
  projectMeta: {
    fontSize: PDF_TYPE.meta,
    color: PDF_COLOR.textMuted,
    marginBottom: 6,
  },
  projectHighlight: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.label,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: PDF_COLOR.textMuted,
    marginTop: 8,
    marginBottom: 5,
  },
  statsInline: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textBody,
    lineHeight: 1.4,
  },
  metricsList: {
    marginTop: 2,
  },
  metricRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  metricLabel: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.meta,
    color: PDF_COLOR.text,
    width: "20%",
  },
  metricItems: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textBody,
    width: "80%",
    lineHeight: 1.38,
  },

  eduEntry: {
    marginBottom: 7,
  },
  eduTitle: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.text,
    marginBottom: 2,
  },

  certGroupLabel: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.label,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: PDF_COLOR.accent,
    marginBottom: 6,
  },
  certGroupLabelAlt: {
    color: "#92400e",
  },
  certEntry: {
    marginBottom: 7,
  },
  certName: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.text,
    marginBottom: 2,
    lineHeight: 1.35,
  },

  stackColumn: {
    width: "50%",
  },
  stackColumnLeft: {
    paddingRight: PDF_GRID.gutter / 2,
  },
  stackColumnRight: {
    paddingLeft: PDF_GRID.gutter / 2,
  },
  stackRow: {
    marginBottom: 7,
  },
  techCategory: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.meta,
    color: PDF_COLOR.text,
    marginBottom: 2,
  },
  techItems: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textBody,
    lineHeight: 1.38,
  },

  langRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingVertical: 1,
  },
  langName: {
    fontFamily: PDF_FONT.bold,
    fontSize: PDF_TYPE.bodySmall,
    width: "50%",
  },
  langLevel: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textMuted,
    width: "50%",
  },
  interestsLine: {
    fontSize: PDF_TYPE.bodySmall,
    color: PDF_COLOR.textBody,
    lineHeight: 1.42,
  },
});
