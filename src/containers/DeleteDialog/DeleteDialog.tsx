import AlertDialog from "../../components/AlertDialog";
import Spinner from "../../components/Spinner";
import TextButton from "../../components/TextButton";

interface DeleteDialogProps {
  isDeleting?: boolean;
  name: string;
  onDelete: () => void;
}

const DeleteDialog = ({
  isDeleting = false,
  name,
  onDelete,
}: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild={true}>
        <TextButton className="min-w-14" disabled={isDeleting}>
          {isDeleting ? <Spinner size={20} /> : "Delete"}
        </TextButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Body>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. "{name}" will be permanently deleted.
          </AlertDialog.Description>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action onClick={onDelete}>
            Yes, delete it
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteDialog;
