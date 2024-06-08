import { ReactNode } from "react";

import { Project } from "../../types";
import FormDialog from "../FormDialog";

export type ProjectFormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

interface ProjectFormDialogProps {
  children?: ReactNode;
  defaultValues?: ProjectFormValues;
  errorMessage?: string;
  isLoading?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: ProjectFormValues) => void;
  submitBtnLabel?: string;
  successMessage?: string;
  title: string;
}

const ProjectFormDialog = ({
  children,
  defaultValues,
  errorMessage,
  isLoading = false,
  isOpen = false,
  onOpenChange,
  onSubmit,
  submitBtnLabel = "Save",
  successMessage,
  title,
}: ProjectFormDialogProps) => {
  return (
    <FormDialog
      defaultValues={defaultValues}
      errorMessage={errorMessage}
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
        onOpenChange && onOpenChange(open);
      }}
      onSubmit={onSubmit}
      submitBtnLabel={submitBtnLabel}
      successMessage={successMessage}
      title={title}
    >
      {children}
    </FormDialog>
  );
};

export default ProjectFormDialog;
