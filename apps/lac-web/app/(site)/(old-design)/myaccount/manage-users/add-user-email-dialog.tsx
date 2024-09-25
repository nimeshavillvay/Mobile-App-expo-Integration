"use client";

import useCheckEmailMutation from "@/_hooks/user/use-check-email-mutation.hook";
import { isErrorResponse } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { CurrentUser } from "./types";

type AddUserEmailProps = {
  readonly currentUsers: CurrentUser[];
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly setOpenAddUserDataDialog: Dispatch<SetStateAction<boolean>>;
  readonly setEmail: Dispatch<SetStateAction<string>>;
};

const AddUserEmailDialog = ({
  currentUsers,
  open,
  setOpen,
  setOpenAddUserDataDialog,
  setEmail,
}: AddUserEmailProps) => {
  const checkEmailMutation = useCheckEmailMutation();

  const addUserSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address.")
      .refine(
        (email) => {
          const userExists = currentUsers.find((currentUser) => {
            return currentUser.email === email;
          });
          if (userExists) {
            return false;
          }

          return true;
        },
        {
          message: "User is already assigned to this account",
        },
      ),
  });
  type AddUserSchema = z.infer<typeof addUserSchema>;

  const form = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: AddUserSchema) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (data, email) => {
        if (data.statusCode === "USER_NEW") {
          setOpenAddUserDataDialog(true);
          setEmail(email);
          form.reset();
          setOpen(false);
        }
      },
      onError: async (error) => {
        if (error?.response?.status === 400) {
          const errorResponse = await error.response.json();
          if (
            isErrorResponse(errorResponse) &&
            errorResponse["status_code"] === "USER_ACTIVE" &&
            errorResponse.message === "Email exists and is valid."
          ) {
            form.setError("email", {
              message: "User already exists",
            });
          }
        }
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }

        setOpen(open);
      }}
    >
      <DialogContent className="old-design-text-base max-w-[360px]">
        <DialogHeader>
          <DialogTitle className="text-left font-wurth">Add User</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email address
          </DialogDescription>
        </DialogHeader>

        <div className="px-12 pb-12 pt-6">
          <p className="mb-4 text-center">
            Please enter your new user&apos;s email address to add them
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="sr-only">
                      Enter email address for the new user
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-base"
                data-button-action="Admin Add New User Validate Email"
              >
                Add user
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserEmailDialog;
