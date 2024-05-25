import { useEffect, useMemo, useState } from "react";

import { getProject } from "../api";
import { Types } from "../stores/reducer";
import { mapProject } from "./useProjects";
import useStore from "./useStore";

type Status = "error" | "idle" | "loading";

interface UseProjectsOptions {
  id?: string;
}

const useProject = ({ id }: UseProjectsOptions) => {
  const { dispatch, state } = useStore();
  const [status, setStatus] = useState<Status>("idle");
  const project = id ? state.projects.data.get(id) : undefined;

  useEffect(() => {
    if (id && !project && status === "idle") {
      console.log("load project", id);
      setStatus("loading");

      try {
        const load = async () => {
          const project = await getProject(id);

          if (!project) {
            setStatus("error");
            return;
          }

          dispatch({ payload: project, type: Types.SET_PROJECT });

          setStatus("idle");
        };
        load();
      } catch {
        setStatus("error");
      }
    }
  }, [dispatch, id, project, status]);

  const data = useMemo(() => {
    if (!project) {
      return undefined;
    }

    return mapProject(project, state);
  }, [project, state]);

  return {
    data,
    isError: status === "error",
    isLoading: status === "loading",
    status,
  };
};

export default useProject;
