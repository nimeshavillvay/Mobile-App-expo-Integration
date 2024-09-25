import type { ShoppingListElement } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useCreateShoppingListMutation from "./use-create-shopping-list-mutation.hook";
import useUpdateShoppingListMutation from "./use-update-shopping-list-mutation.hook";

type ShoppingListDialogProps = {
  readonly open: boolean;
  readonly setOpenShoppingListDialog: Dispatch<SetStateAction<boolean>>;
  readonly setSelectedAddressShoppingListId?: Dispatch<SetStateAction<string>>;
  readonly isShoppingListNameUpdate: boolean;
  readonly shoppingList: ShoppingListElement;
};

const ShoppingListDialog = ({
  open,
  setOpenShoppingListDialog,
  setSelectedAddressShoppingListId,
  isShoppingListNameUpdate,
  shoppingList,
}: ShoppingListDialogProps) => {
  const shoppingListNameSchema = z.object({
    shoppingListName: z
      .string()
      .trim()
      .min(1, "Please enter a name for the shopping list"),
  });

  type ShoppingListNameSchema = z.infer<typeof shoppingListNameSchema>;

  const form = useForm<ShoppingListNameSchema>({
    resolver: zodResolver(shoppingListNameSchema),
    values: {
      shoppingListName: shoppingList.listName,
    },
  });

  const createShoppingListMutation = useCreateShoppingListMutation();
  const updateShoppingListMutation = useUpdateShoppingListMutation();

  const onShoppingListNameSubmit = (formData: ShoppingListNameSchema) => {
    if (isShoppingListNameUpdate) {
      updateShoppingListMutation.mutate(
        { listId: shoppingList.listId, listName: formData.shoppingListName },
        {
          onSuccess: () => {
            setOpenShoppingListDialog(false);
            form.reset();
          },
        },
      );
    } else {
      createShoppingListMutation.mutate(formData.shoppingListName, {
        onSuccess: (data) => {
          setOpenShoppingListDialog(false);
          form.reset();
          if (setSelectedAddressShoppingListId) {
            setSelectedAddressShoppingListId(data.list_id);
          }
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenShoppingListDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Shopping List</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onShoppingListNameSubmit)}
            className="space-y-4 p-5"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="shoppingListName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Shopping List Name
                    </FormLabel>
                    <FormDescription className="sr-only">
                      Shopping List Name
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Shopping List Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Shopping List Name
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-right">
              <Button
                type="submit"
                className="h-9 rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
                disabled={
                  createShoppingListMutation.isPending ||
                  updateShoppingListMutation.isPending
                }
                data-button-action="Shopping List Remove or Update List Name"
              >
                Done
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingListDialog;
