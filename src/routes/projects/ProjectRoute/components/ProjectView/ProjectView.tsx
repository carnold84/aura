import { ProjectWithImages } from "../../../../../api/types";

const ProjectView = ({ project }: { project: ProjectWithImages }) => {
  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {project.images.map(({ id, name, url }) => {
          return (
            <li key={id}>
              {name}
              <img src={url} width="100" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectView;
