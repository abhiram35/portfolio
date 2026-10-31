import { Router } from 'express';
import { deliver } from './mailer.js';

const RATE_LIMIT = 5; // messages per IP per window
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map(); // ip -> timestamps of recent submissions

function rateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Drop stale IPs so the map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
  }
}, WINDOW_MS).unref();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(body) {
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const message = String(body?.message ?? '').trim();

  if (!name || name.length > 100 || /[\r\n]/.test(name)) {
    return { error: 'Please enter your name (up to 100 characters).' };
  }
  if (email.length > 200 || !EMAIL_RE.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (message.length < 10 || message.length > 5000) {
    return { error: 'Your message should be between 10 and 5000 characters.' };
  }
  return { value: { name, email, message } };
}

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  // Honeypot: real visitors never see or fill the "website" field, bots usually do.
  // Pretend it worked so the bot doesn't retry.
  if (req.body?.website) return res.json({ ok: true });

  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many messages from you. Please try again later or email me directly.' });
  }

  const { error, value } = validate(req.body);
  if (error) return res.status(400).json({ error });

  await deliver(value); // Express 5 forwards a rejection to the error handler.
  res.json({ ok: true });
});
