export type ContactEnv = {
  resendApiKey: string;
  contactEmail: string;
  resendFromEmail: string;
};

export function getContactEnv(): ContactEnv | null {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!resendApiKey || !contactEmail || !resendFromEmail) {
    return null;
  }

  return { resendApiKey, contactEmail, resendFromEmail };
}
