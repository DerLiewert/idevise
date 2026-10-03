import { Dialog, DialogContent } from "@/shared/ui";
import { FormGroup } from "./form-group";
import { SpecificationGroup } from "../model";

type EditGroupDialog = {
  item: SpecificationGroup | null;
  onClose: () => void;
};

export const EditGroupDialog = ({ item, onClose }: EditGroupDialog) => {
  return (
    <Dialog
      open={item !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        {item && (
          <FormGroup
            role="edit"
            onSuccess={onClose}
            defaultValues={item}
            group_id={item.id}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
