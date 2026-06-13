export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailHtml(payload: ContactEmailPayload): string {
  const { name, email, subject, message, sentAt } = payload;

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0f172a;max-width:560px;">
      <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;">Nova mensagem de contacto</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#64748b;width:120px;vertical-align:top;">Nome</td>
          <td style="padding:8px 0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;vertical-align:top;">Assunto</td>
          <td style="padding:8px 0;">${escapeHtml(subject)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;vertical-align:top;">Data/Hora</td>
          <td style="padding:8px 0;">${escapeHtml(sentAt)}</td>
        </tr>
      </table>
      <p style="margin:20px 0 8px;font-size:14px;font-weight:600;">Mensagem</p>
      <p style="margin:0;font-size:14px;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `.trim();
}

export function formatContactSentAt(date = new Date()): string {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(date);
}
