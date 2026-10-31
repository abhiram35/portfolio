import { ArrowUpRight } from 'lucide-react';

export default function ProjectList({ items }) {
  return (
    <ul className="divide-y divide-rule">
      {items.map((p) => (
        <li key={p.title} className="group py-10 first:pt-0 last:pb-0">
          <p className="text-sm font-medium text-accent">{p.kind}</p>
          <h3 className="mt-2 font-display text-2xl font-normal tracking-tight sm:text-[2rem]">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 transition-colors hover:text-accent"
            >
              {p.title}
              <ArrowUpRight
                size={22}
                aria-label="(GitHub, opens in a new tab)"
                className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          </h3>
          <p className="mt-3 text-lg">{p.description}</p>
          {p.details && <p className="mt-3 max-w-2xl text-muted">{p.details}</p>}
          {p.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
              {p.tags.map((t) => (
                <li key={t} className="rounded border border-rule bg-surface px-2 py-0.5 font-mono text-[12.5px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
