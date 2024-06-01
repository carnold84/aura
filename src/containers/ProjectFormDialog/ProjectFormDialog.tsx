import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "../../components/Alert";
import Dialog from "../../components/Dialog/Dialog";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import TextButton from "../../components/TextButton/TextButton";
import TextField from "../../components/TextField";
import { Project } from "../../types";

export type ProjectFormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

interface ProjectFormDialogProps {
  children: ReactNode;
  defaultValues?: ProjectFormValues;
  errorMessage?: string;
  isLoading?: boolean;
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
  onOpenChange,
  onSubmit: onSubmitProp,
  submitBtnLabel = "Save",
  successMessage,
  title,
}: ProjectFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<ProjectFormValues> = async (
    data: ProjectFormValues,
  ) => {
    await onSubmitProp(data);
  };

  useEffect(() => {
    if (isOpen === false) {
      reset(defaultValues);
    }
  }, [defaultValues, isOpen, isLoading, reset]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        onOpenChange && onOpenChange(open);
      }}
    >
      <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title={title} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Body className="flex flex-col gap-3">
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
            <TextField
              disabled={isLoading}
              error={errors["name"]?.message}
              label="Project Name"
              {...register("name", { required: "Name is required" })}
            />
            <TextField
              disabled={isLoading}
              label="Description"
              {...register("description")}
            />
            <TextField
              disabled={isLoading}
              label="Image Url"
              {...register("imageUrl")}
            />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild={true} disabled={isLoading}>
              <TextButton>Cancel</TextButton>
            </Dialog.Close>
            <PrimaryButton className="min-w-20" type="submit">
              {isLoading ? <Spinner size={20} /> : submitBtnLabel}
            </PrimaryButton>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export default ProjectFormDialog;
