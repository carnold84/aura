import { Plus } from "iconoir-react";
import { useState } from "react";

import TextButton from "../../components/TextButton";
import useCreateProject from "../../hooks/useCreateProject";
import { Project } from "../../types";
import FormDialog from "../FormDialog";

export type FormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

const CreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject, isError, isLoading, reset } = useCreateProject();
  const onSubmit = async (data: FormValues) => {
    await createProject(data);
    setIsOpen(false);
  };

  return (
    <FormDialog
      errorMessage={
        isError ? "Sorry. We couldn't create your project. :(" : undefined
      }
      fields={[
        {
          label: "Project Name",
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
          name: "imageUrl",
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
      submitBtnLabel="Create"
      title="Create Project"
    >
      <TextButton iconLeft={<Plus className="h-5 w-5" />}>Create</TextButton>
    </FormDialog>
  );
};

export default CreateProjectDialog;
