import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-rule bg-paper/90 backdrop-blur' : 'border-transparent bg-paper'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-display text-xl font-medium tracking-tight hover:text-accent">
          {site.name}
        </a>
        <ul className="flex items-center gap-4 text-[15px] text-muted sm:gap-7">
          {navLinks.map((l) => (
            <li key={l.id} className={l.id === 'hackathons' ? 'hidden sm:block' : undefined}>
              <a href={`#${l.id}`} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
