import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { contact, facts, hero, site } from '../data/site.js';

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="w-48 shrink-0 sm:w-56 lg:w-64">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-rule">
        {failed ? (
          <div className="flex h-full items-center justify-center font-display text-6xl text-muted">{site.initials}</div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}${site.photo}`}
            alt={`Photo of ${site.name}`}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{site.location}</figcaption>
    </figure>
  );
}

export default function Hero() {
  const [lead, emphasis] = hero.headline;

  return (
    <section id="top" aria-label="Introduction" className="container-page pb-16 pt-12 sm:pb-20 sm:pt-20">
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-[15px] text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
            {hero.available}
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {lead} <em className="font-normal text-accent">{emphasis}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#work" className="btn bg-ink text-paper hover:bg-accent">
              See my work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={`mailto:${contact.email}`} className="link text-[15px] font-medium">
              {contact.email}
            </a>
          </div>
        </div>
        <Portrait />
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule pt-8 sm:mt-20 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="mt-1 font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
