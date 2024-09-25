import { create } from "zustand";

type LoginDialogState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

/**
 * Used to open and close the login dialog
 */
const useLoginDialog = create<LoginDialogState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useLoginDialog;
