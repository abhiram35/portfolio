// Two-column section: heading on the left (sticky on wide screens), content on the right.
export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page scroll-mt-16">
      <div className="grid gap-8 border-t border-rule py-16 sm:py-24 md:grid-cols-[14rem_1fr] md:gap-12">
        <div>
          <div className="md:sticky md:top-24">
            <h2 id={`${id}-title`} className="font-display text-3xl font-normal tracking-tight">
              {title}
            </h2>
            {intro && <p className="mt-3 max-w-xs text-[15px] text-muted">{intro}</p>}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
