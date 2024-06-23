import { useSearchParams } from "react-router-dom";

import Dialog from "../../../../../components/Dialog";
import LoadingScreen from "../../../../../components/LoadingScreen";
import useImages from "../../../../../hooks/useImages";
import useProject from "../../../../../hooks/useProject";
import AddImageCard from "../AddImageCard";

interface DialogContentProps {
  projectId: string;
}

const DialogContent = ({ projectId }: DialogContentProps) => {
  const { data: images, isError, isLoading } = useImages();
  const {
    data: project,
    isError: isProjectError,
    isLoading: isProjectLoading,
  } = useProject({
    id: projectId,
  });

  if (isLoading || isProjectLoading) {
    return <LoadingScreen />;
  }

  if (isError || isProjectError || !project) {
    return <p>An error occured.</p>;
  }

  return (
    <>
      <Dialog.Header
        isLoading={isProjectLoading}
        title={`Add images to ${project?.name}`}
      />
      <Dialog.Body className="min-h-40">
        <ul className="grid gap-5 sm:grid-cols-2 md:grid-flow-col md:grid-cols-3 lg:grid-cols-4">
          {images?.map((image) => {
            return (
              <li key={image.id}>
                <AddImageCard image={image} project={project} />
              </li>
            );
          })}
        </ul>
      </Dialog.Body>
    </>
  );
};

const ImageListDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = searchParams.get("modal");
  const projectId = searchParams.get("projectId");

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open === false) {
          searchParams.delete("modal");
          setSearchParams(searchParams);
        }
      }}
      open={modal === "add-images"}
    >
      <Dialog.Content
        className="max-w-5xl"
        onCloseEnd={() => {
          searchParams.delete("projectId");
          setSearchParams(searchParams);
        }}
      >
        {projectId && <DialogContent projectId={projectId} />}
      </Dialog.Content>
    </Dialog>
  );
};

export default ImageListDialog;
