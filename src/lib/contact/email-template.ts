export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
  sentAt: string;
  siteUrl: string;
};

const COLORS = {
  headerBg: "#020817",
  headerBorder: "#1e293b",
  primary: "#0284c7",
  bodyBg: "#f1f5f9",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  label: "#64748b",
  text: "#0f172a",
  muted: "#94a3b8",
  white: "#ffffff",
} as const;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function infoCard(label: string, valueHtml: string): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px;">
      <tr>
        <td style="background-color:${COLORS.cardBg};border:1px solid ${COLORS.cardBorder};border-radius:10px;padding:16px 18px;">
          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.label};">
            ${escapeHtml(label)}
          </p>
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;line-height:1.45;color:${COLORS.text};">
            ${valueHtml}
          </p>
        </td>
      </tr>
    </table>
  `.trim();
}

export function buildContactEmailSubject(name: string): string {
  return `Nova mensagem de contacto - ${name}`;
}

export function formatContactSentAt(date = new Date()): string {
  const datePart = new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Lisbon",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon",
  }).format(date);

  return `${datePart} · ${timePart}`;
}

export function buildContactEmailText(payload: ContactEmailPayload): string {
  const { name, email, message, sentAt, siteUrl } = payload;

  return [
    "Nova mensagem de contacto",
    "",
    `Nome: ${name}`,
    `Email: ${email}`,
    `Data/Hora: ${sentAt}`,
    "",
    "Mensagem:",
    message,
    "",
    `Enviada através de: ${siteUrl}`,
  ].join("\n");
}

export function buildContactEmailHtml(payload: ContactEmailPayload): string {
  const { name, email, message, sentAt, siteUrl } = payload;
  const safeEmail = escapeHtml(email);
  const safeName = escapeHtml(name);
  const safeSiteHost = escapeHtml(siteUrl.replace(/^https?:\/\//, ""));
  const safeSiteUrl = escapeHtml(siteUrl);
  const messageHtml = escapeHtml(message).replace(/\n/g, "<br />");
  const mailtoSimple = `mailto:${encodeURIComponent(email)}`;
  const replySubject = encodeURIComponent(`Re: ${buildContactEmailSubject(name)}`);
  const mailtoLink = `${mailtoSimple}?subject=${replySubject}`;

  const emailCard = infoCard(
    "Email",
    `<a href="${mailtoSimple}" style="color:${COLORS.primary};text-decoration:none;">${safeEmail}</a>`,
  );

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Nova mensagem de contacto</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bodyBg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.bodyBg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background-color:${COLORS.headerBg};border:1px solid ${COLORS.headerBorder};border-radius:12px 12px 0 0;padding:28px 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;line-height:1.3;color:${COLORS.white};">
                      Victor Rodrigues
                    </p>
                    <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted};">
                      Portfolio
                    </p>
                    <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#e2e8f0;">
                      Nova mensagem recebida através do formulário de contacto
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;">
                      <a href="${safeSiteUrl}" style="color:#38bdf8;text-decoration:none;">${safeSiteHost}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:${COLORS.cardBg};border-left:1px solid ${COLORS.cardBorder};border-right:1px solid ${COLORS.cardBorder};padding:24px 28px 8px;">

              ${infoCard("Nome", safeName)}
              ${emailCard}
              ${infoCard("Data/Hora", escapeHtml(sentAt))}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:4px 0 20px;">
                <tr>
                  <td style="background-color:#f8fafc;border:1px solid ${COLORS.cardBorder};border-radius:10px;padding:18px 20px;">
                    <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.label};">
                      Mensagem
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:${COLORS.text};">
                      ${messageHtml}
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 8px;">
                <tr>
                  <td align="center" style="border-radius:8px;background-color:${COLORS.primary};">
                    <a href="${mailtoLink}" target="_blank" style="display:inline-block;padding:13px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;line-height:1;color:${COLORS.white};text-decoration:none;border-radius:8px;">
                      Responder ao Contacto
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="background-color:${COLORS.cardBg};border:1px solid ${COLORS.cardBorder};border-top:0;border-radius:0 0 12px 12px;padding:20px 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-top:1px solid ${COLORS.cardBorder};padding-top:20px;">
                    <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};">
                      Mensagem enviada através de:
                    </p>
                    <p style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">
                      <a href="${safeSiteUrl}" style="color:${COLORS.primary};text-decoration:none;">${safeSiteUrl}</a>
                    </p>
                    <p style="margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};">
                      Portfolio pessoal de Victor Rodrigues
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#cbd5e1;">
                      Email processado via Resend
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
