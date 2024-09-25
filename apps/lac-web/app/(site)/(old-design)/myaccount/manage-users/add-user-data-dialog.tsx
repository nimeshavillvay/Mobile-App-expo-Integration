"use client";

import type { PasswordPolicies } from "@/_lib/types";
import { checkPasswordComplexity } from "@/_lib/utils";
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
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import type { Role } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { MdPermIdentity } from "react-icons/md";
import * as z from "zod";
import useAddUserDataMutation from "./use-add-user-data-mutation.hook";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const addUserDataSchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter first name.").max(40),
    lastName: z.string().trim().min(1, "Please enter last name.").max(40),
    jobTitle: z.string(),
    permission: z.string().min(1, "Please enter permission type."),
    password: z.string(),
    confirmPassword: z.string(),
    forcePasswordReset: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

type AddUserDataProps = {
  readonly jobRoles: Role[];
  readonly open: boolean;
  readonly email: string;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly passwordPolicies: PasswordPolicies;
};

const AddUserDataDialog = ({
  jobRoles,
  open,
  email,
  setOpen,
  passwordPolicies,
}: AddUserDataProps) => {
  const refinedSchema = addUserDataSchema.superRefine(({ password }, context) =>
    checkPasswordComplexity({
      password,
      passwordPolicies,
      context,
    }),
  );

  type AddUserDataSchema = z.infer<typeof refinedSchema>;

  const addUserDataMutation = useAddUserDataMutation();

  const form = useForm<AddUserDataSchema>({
    resolver: zodResolver(refinedSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      password: "",
      confirmPassword: "",
      permission: "",
      forcePasswordReset: false,
    },
  });

  const onSubmit = (data: AddUserDataSchema) => {
    addUserDataMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
        email: email,
        password: data.password ?? "",
        permission: data.permission,
        forcePasswordReset: data.forcePasswordReset,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="old-design-text-base max-w-[500px] gap-0">
        <DialogHeader>
          <DialogTitle className="text-left font-wurth">Add User</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-5">
          <div className="flex flex-col items-center justify-center text-center text-brand-gray-500">
            <MdPermIdentity className="m-auto text-4xl leading-none" />

            <p className="text-brand-primary">User Not Found!</p>

            <p className="text-wrap">
              Please provide following details to add
              <br />
              <span className="text-brand-secondary">{email}</span> to this
              account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">First Name*</FormLabel>
                        <FormDescription className="sr-only">
                          Enter first name for the new user
                        </FormDescription>

                        <FormControl>
                          <Input
                            placeholder="First Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Last Name*</FormLabel>

                        <FormDescription className="sr-only">
                          Enter last name for the new user
                        </FormDescription>

                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem className="flex-1 space-y-0.5">
                        <FormLabel className="font-bold">Job Title</FormLabel>

                        <FormDescription className="sr-only">
                          Select job title for the new user
                        </FormDescription>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                              <SelectValue placeholder="Job Title" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {jobRoles.map((role) => (
                              <SelectItem key={role?.code} value={role?.code}>
                                {role?.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="permission"
                    render={({ field }) => (
                      <FormItem className="mb-2 flex-1 space-y-0.5">
                        <FormLabel className="font-bold">Permission*</FormLabel>

                        <FormDescription className="sr-only">
                          Select permission for the new user
                        </FormDescription>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                              <SelectValue placeholder="Permission" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {USER_PERMISSIONS.map((permission) => (
                              <SelectItem
                                value={permission?.value}
                                key={permission?.value}
                              >
                                {permission?.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Password*</FormLabel>
                        <FormDescription className="sr-only">
                          Enter password for the new user
                        </FormDescription>

                        <FormControl>
                          <Input
                            placeholder="Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Confirm Password*
                        </FormLabel>

                        <FormDescription className="sr-only">
                          Enter password confirmation for the new user
                        </FormDescription>

                        <FormControl>
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-xs dark:text-brand-primary" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="forcePasswordReset"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>

                        <FormLabel>Force password reset.</FormLabel>

                        <FormDescription className="sr-only">
                          Force user to reset the password
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-base"
                data-button-action="Admin Add New User"
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

export default AddUserDataDialog;
