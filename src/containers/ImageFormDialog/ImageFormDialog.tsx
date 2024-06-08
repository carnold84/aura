import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "../../components/Alert";
import Dialog from "../../components/Dialog/Dialog";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import TextButton from "../../components/TextButton";
import TextField from "../../components/TextField";
import { Image } from "../../types";

export type ImageFormValues = Omit<
  Image,
  "createdAt" | "id" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

interface ImageFormDialogProps {
  defaultValues?: ImageFormValues;
  errorMessage?: string;
  isLoading?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: ImageFormValues) => void;
  submitBtnLabel?: string;
  successMessage?: string;
  title: string;
}

const ImageFormDialog = ({
  defaultValues,
  errorMessage,
  isLoading = false,
  isOpen = false,
  onOpenChange,
  onSubmit: onSubmitProp,
  submitBtnLabel = "Save",
  successMessage,
  title,
}: ImageFormDialogProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<ImageFormValues> = async (
    data: ImageFormValues,
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
        onOpenChange && onOpenChange(open);
      }}
    >
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
              label="Image Name"
              {...register("name", { required: "Name is required" })}
            />
            <TextField
              disabled={isLoading}
              label="Description"
              {...register("description")}
            />
            <TextField disabled={isLoading} label="Url" {...register("url")} />
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

export default ImageFormDialog;
