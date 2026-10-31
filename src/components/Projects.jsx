import { projects } from '../data/projects.js';
import Section from './Section.jsx';
import ProjectList from './ProjectList.jsx';

export default function Projects() {
  return (
    <Section id="work" title="Selected work" intro="Things I've built on my own, from first principles to working software.">
      <ProjectList items={projects} />
    </Section>
  );
}
