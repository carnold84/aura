import useStore from "../stores/store";
import useQuery from "./useQuery";

const useProjects = () => {
  const fetchProjects = useStore((store) => store.projects.list);
  const { isError, isLoading, status } = useQuery({
    queryFn: fetchProjects,
  });
  const projects = useStore((store) => store.projects.projects());

  return {
    data: projects,
    isError,
    isLoading,
    status,
  };
};

export default useProjects;
