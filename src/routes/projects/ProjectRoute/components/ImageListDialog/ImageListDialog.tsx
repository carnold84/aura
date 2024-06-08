import Dialog from "../../../../../components/Dialog";
import LoadingScreen from "../../../../../components/LoadingScreen";
import useImages from "../../../../../hooks/useImages";
import { Project } from "../../../../../types";
import AddImageCard from "../AddImageCard";

interface ImageListDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

const ImageListDialog = ({
  isOpen,
  onOpenChange,
  project,
}: ImageListDialogProps) => {
  const { data: images, isError, isLoading } = useImages();

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Content className="max-w-5xl">
        <Dialog.Header title={`Add images to ${project.name}`} />
        <Dialog.Body className="min-h-40">
          {isError && <p>An error occured.</p>}
          {isLoading && <LoadingScreen />}
          {images && (
            <ul className="grid grid-flow-col grid-cols-3 gap-5">
              {images?.map((image) => {
                return (
                  <li key={image.id}>
                    <AddImageCard image={image} project={project} />
                  </li>
                );
              })}
            </ul>
          )}
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
};

export default ImageListDialog;
