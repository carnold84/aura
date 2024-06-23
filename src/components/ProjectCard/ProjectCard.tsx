import { formatRelative } from "date-fns";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Project } from "../../types";
import Card from "../Card";

interface ProjectCardProps {
  className?: string;
  project: Project;
  to: string;
}

const ProjectCard = ({ project, to, ...rest }: ProjectCardProps) => {
  const updated = useMemo(() => {
    return formatRelative(project.updatedAt, Date.now());
  }, [project.updatedAt]);
  return (
    <Card {...rest}>
      <Link to={to}>
        <Card.Img src={project.imageUrl || undefined} />
      </Link>
      <Card.Content className="gap-1">
        <Card.Title className="hover:text-primary-700">
          <Link to={to}>{project.name}</Link>
        </Card.Title>
        <p className="font-display text-sm uppercase text-neutral-400">
          Updated {updated}
        </p>
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
