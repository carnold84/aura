import { Plus } from "iconoir-react";
import { useState } from "react";

import TextButton from "../../components/TextButton";
import useCreateImage from "../../hooks/useCreateImage";
import { Image } from "../../types";
import FormDialog from "../FormDialog";

export type FormValues = Omit<
  Image,
  "createdAt" | "id" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

const CreateImageDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createImage, isError, isLoading, reset } = useCreateImage();
  const onSubmit = async (data: FormValues) => {
    await createImage(data);
    setIsOpen(false);
  };

  return (
    <FormDialog
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
        {
          label: "Image Url",
          name: "url",
          type: "text",
        },
      ]}
      isLoading={isLoading}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
        setIsOpen(open);
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Image"
      title="Create Image"
    >
      <TextButton iconLeft={<Plus className="h-5 w-5" />}>Create</TextButton>
    </FormDialog>
  );
};

export default CreateImageDialog;
