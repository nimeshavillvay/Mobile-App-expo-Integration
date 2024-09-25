import { create } from "zustand";

type AccountSelectorDialogState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

/**
 * Used to open and close the account selector
 */
const useAccountSelectorDialog = create<AccountSelectorDialogState>()(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }),
);

export default useAccountSelectorDialog;
