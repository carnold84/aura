import { useState } from "react";

import AlertDialog from "../../components/AlertDialog";
import Spinner from "../../components/Spinner";

interface DeleteDialogProps {
  isDeleting?: boolean;
  isOpen: boolean;
  name: string;
  onDelete: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const DeleteDialog = ({
  isOpen,
  name,
  onDelete,
  onOpenChange,
}: DeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={isOpen}>
      <AlertDialog.Content>
        <AlertDialog.Body>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. "{name}" will be permanently deleted.
          </AlertDialog.Description>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={isDeleting}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            className="min-w-32"
            disabled={isDeleting}
            onClick={async (evt) => {
              evt.preventDefault();
              setIsDeleting(true);
              await onDelete();
              onOpenChange(false);
              setIsDeleting(false);
            }}
          >
            {isDeleting ? <Spinner size={20} /> : "Yes, delete it"}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteDialog;
