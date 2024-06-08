import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types";
import FormDialog from "../FormDialog";

export type FormValues = Omit<
  Image,
  "createdAt" | "id" | "url" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

interface UpdateImageDialogProps {
  image: Image;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateImageDialog = ({
  image,
  isOpen,
  onOpenChange,
}: UpdateImageDialogProps) => {
  const { updateImage, isError, isLoading, reset } = useUpdateImage();
  const onSubmit = async (data: FormValues) => {
    await updateImage({ ...data, id: image.id });
    onOpenChange(false);
  };

  const { description, name, url } = image;

  return (
    <FormDialog
      defaultValues={{ description, name, url }}
      errorMessage={
        isError ? "Sorry. We couldn't create your image. :(" : undefined
      }
      fields={[
        {
          label: "Image Name",
          name: "name",
          type: "text",
          required: true,
        },
        {
          label: "Description",
          name: "description",
          type: "text",
        },
      ]}
      isLoading={isLoading}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
        onOpenChange && onOpenChange(open);
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Update"
      title={`Update ${image.name}`}
    />
  );
};

export default UpdateImageDialog;
