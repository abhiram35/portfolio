import express from 'express';
import cors from 'cors';
import { contactRouter } from './contact.js';
import { mailerConfigured } from './mailer.js';

const PORT = Number(process.env.PORT) || 3001;
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Without SMTP the API only saves messages to a local file, which is useless on a host with an ephemeral disk.
if (isProd && !mailerConfigured) {
  console.error('SMTP_USER, SMTP_PASS and MAIL_TO must be set in production.');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1); // Render/Railway sit behind a proxy; needed for the real client IP.
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Message is too large' });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  if (!mailerConfigured) console.log('SMTP not configured: messages will be saved to server/messages.jsonl');
});
