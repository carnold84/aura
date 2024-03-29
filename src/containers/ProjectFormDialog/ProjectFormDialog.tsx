import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../components/Button";
import Dialog from "../../components/Dialog/Dialog";
import Spinner from "../../components/Spinner";
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
  onSubmit: (data: ProjectFormValues) => void;
  submitBtnLabel?: string;
  title: string;
}

const ProjectFormDialog = ({
  children,
  defaultValues,
  errorMessage,
  isLoading = false,
  onSubmit: onSubmitProp,
  submitBtnLabel = "Save",
  title,
}: ProjectFormDialogProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<ProjectFormValues> = (
    data: ProjectFormValues,
  ) => {
    onSubmitProp(data);
    reset();
  };

  console.log(errors["name"]);

  return (
    <Dialog>
      <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title={title} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && <p>{errorMessage}</p>}
          <Dialog.Body className="flex flex-col gap-3">
            <TextField
              error={errors["name"]?.message}
              label="Project Name"
              {...register("name", { required: "Name is required" })}
            />
            <TextField label="Description" {...register("description")} />
            <TextField label="Image Url" {...register("imageUrl")} />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild={true}>
              <Button variant="text">Cancel</Button>
            </Dialog.Close>
            <Button className="min-w-16" variant="contained" type="submit">
              {isLoading ? <Spinner size={20} /> : submitBtnLabel}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export default ProjectFormDialog;
