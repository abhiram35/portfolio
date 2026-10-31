import { hackathons } from '../data/projects.js';
import Section from './Section.jsx';
import ProjectList from './ProjectList.jsx';

export default function Activity() {
  return (
    <Section id="hackathons" title="Hackathons" intro="Built against the clock.">
      <ProjectList items={hackathons} />
    </Section>
  );
}
