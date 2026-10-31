import nodemailer from 'nodemailer';
import { appendFile } from 'node:fs/promises';

const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

export const mailerConfigured = Boolean(SMTP_USER && SMTP_PASS && MAIL_TO);

const transport = mailerConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

const LOG_FILE = new URL('../messages.jsonl', import.meta.url);

export async function deliver({ name, email, message }) {
  if (!transport) {
    // Local fallback so the form can be tested without email credentials.
    const line = JSON.stringify({ at: new Date().toISOString(), name, email, message });
    await appendFile(LOG_FILE, `${line}\n`);
    console.log(`[contact] saved message from ${email}`);
    return;
  }

  await transport.sendMail({
    from: { name: 'Portfolio contact form', address: SMTP_USER },
    to: MAIL_TO,
    replyTo: { name, address: email },
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n${name} <${email}>`,
  });
}
