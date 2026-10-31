import { skills } from '../data/skills.js';
import Section from './Section.jsx';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.category}>
            <h3 className="border-b border-rule pb-2 text-sm font-medium text-muted">{g.category}</h3>
            <ul className="mt-3 space-y-1.5">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
