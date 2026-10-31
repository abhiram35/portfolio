import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { contact, CONTACT_ENDPOINT } from '../data/site.js';
import Toast from './Toast.jsx';

const inputClass =
  'w-full rounded-md border border-band-ink/20 bg-band-ink/5 px-3 py-2.5 text-band-ink placeholder:text-band-ink/40 focus:border-band-ink/60 focus:outline-none';

export default function Contact() {
  // `website` is a honeypot: hidden from people, but bots fill it in and the server drops those.
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const dismiss = useCallback(() => setToast(null), []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!CONTACT_ENDPOINT) {
      const subject = encodeURIComponent(`Hello from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setToast({ type: 'success', message: 'Opening your email app…' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        // 400/429 carry a message meant for the visitor; anything else gets the generic fallback.
        const data = await res.json().catch(() => ({}));
        const err = new Error(`Request failed: ${res.status}`);
        if (res.status === 400 || res.status === 429) err.userMessage = data.error;
        throw err;
      }
      setForm({ name: '', email: '', message: '', website: '' });
      setToast({ type: 'success', message: "Thanks, got it. I'll reply soon." });
    } catch (err) {
      setToast({
        type: 'error',
        message: err.userMessage || `That didn't go through. Please email me at ${contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-band text-band-ink">
      <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="contact-title" className="font-display text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
            Hiring for an ML role? <em className="text-accent">I'd like to hear about it.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg text-band-ink/70">
            Email is the quickest way to reach me, or use the form and it'll land in my inbox.
          </p>
          <ul className="mt-10 divide-y divide-band-ink/15 border-y border-band-ink/15">
            {contact.links.map(({ type, label, handle, href }) => {
              const external = href.startsWith('http');
              return (
                <li key={type}>
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <span className="text-band-ink/60">{label}</span>
                    <span className="flex min-w-0 items-center gap-2 font-medium">
                      <span className="truncate">{handle}</span>
                      <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 lg:pt-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-band-ink/70">Name</span>
              <input name="name" required autoComplete="name" value={form.name} onChange={update} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-band-ink/70">Email</span>
              <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update} className={inputClass} />
            </label>
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm text-band-ink/70">Message</span>
            <textarea name="message" required rows={6} value={form.message} onChange={update} className={`${inputClass} resize-y`} />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="btn bg-accent text-white hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
      <Toast toast={toast} onDismiss={dismiss} />
    </section>
  );
}
