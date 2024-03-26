import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../components/Button";
import Dialog from "../../components/Dialog/Dialog";
import TextField from "../../components/TextField";
import { Project } from "../../types";

export type ProjectFormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

interface ProjectFormDialogProps {
  defaultValues?: ProjectFormValues;
  errorMessage?: string;
  onSubmit: (data: ProjectFormValues) => void;
}

const ProjectFormDialog = ({
  defaultValues,
  errorMessage,
  onSubmit: onSubmitProp,
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
      <Dialog.Trigger asChild={true}>
        <button>Create</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title="Create Project" />
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
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export default ProjectFormDialog;
