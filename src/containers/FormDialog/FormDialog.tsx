import { ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Alert from "../../components/Alert";
import Dialog from "../../components/Dialog/Dialog";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import TextButton from "../../components/TextButton";
import TextField from "../../components/TextField";

interface Field<TFieldValues> {
  label: string;
  name: Path<TFieldValues>;
  required?: boolean;
  type: "text";
}

interface FormDialogProps<TFieldValues extends FieldValues> {
  children?: ReactNode;
  defaultValues?: DefaultValues<TFieldValues>;
  errorMessage?: string;
  fields: Field<TFieldValues>[];
  isLoading?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: TFieldValues) => void;
  submitBtnLabel?: string;
  successMessage?: string;
  title: string;
}

const FormDialog = <TFieldValues extends FieldValues = FieldValues>({
  children,
  defaultValues,
  errorMessage,
  fields,
  isLoading = false,
  isOpen = false,
  onOpenChange,
  onSubmit: onSubmitProp,
  submitBtnLabel = "Save",
  title,
}: FormDialogProps<TFieldValues>) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<TFieldValues> = async (data: TFieldValues) => {
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
      {children && <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>}
      <Dialog.Content>
        <Dialog.Header title={title} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Body className="flex flex-col gap-3">
            {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
            {fields.map(({ label, name, required, type }) => {
              const errorMessage = errors[name]?.message;

              if (type === "text") {
                return (
                  <TextField
                    disabled={isLoading}
                    error={
                      typeof errorMessage === "string"
                        ? errorMessage
                        : undefined
                    }
                    key={name}
                    label={label}
                    {...register(name, {
                      required: required ? `${label} is required` : false,
                    })}
                  />
                );
              }
            })}
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

export default FormDialog;
