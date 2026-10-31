import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="bg-band text-band-ink/60">
      <div className="container-page flex flex-col gap-2 border-t border-band-ink/15 py-8 text-sm sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Last updated {site.updated}</p>
      </div>
    </footer>
  );
}
