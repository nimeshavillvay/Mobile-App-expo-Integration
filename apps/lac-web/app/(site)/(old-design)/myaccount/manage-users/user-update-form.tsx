import useUpdateProfileMutation from "@/_hooks/user/use-update-profile-mutation.hook";
import type { Status, UpdateUser } from "@/_lib/types";
import { Button } from "@/old/_components/ui/button";
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
import useForgetPasswordMutation from "@/old/_hooks/account/use-forget-password-mutation.hook";
import type { Role } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { USER_PERMISSIONS, USER_STATUSES } from "./constants";
import type { ForgetPasswordResponse, UserProfile } from "./types";

const PASSWORD_RESET_INACTIVE_MSG =
  "This User is currently flagged as deactive in the system. please contact web support at websupport@wurthlac.com, or call 800-422-4389 x1014.";

const updateUserSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter first name.").max(40),
  lastName: z.string().trim().min(1, "Please enter last name.").max(40),
  jobTitle: z.string().nullable(),
  email: z
    .string()
    .trim()
    .min(1, "Please enter email address.")
    .email("Please enter a valid email address."),
  permission: z.string().min(1, "Please enter permission type."),
  status: z.string(),
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

type UpdateUserProps = {
  readonly user: UserProfile;
  readonly jobRoles: Role[];
  readonly setMessage: Dispatch<SetStateAction<string>>;
  readonly setMessageOpen: Dispatch<SetStateAction<boolean>>;
};

const UserUpdateForm = ({
  user,
  jobRoles,
  setMessage,
  setMessageOpen,
}: UpdateUserProps) => {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      jobTitle: user?.role,
      email: user?.email,
      permission: user?.permission,
      status: user?.status,
    },
  });

  const updateProfileMutation = useUpdateProfileMutation();
  const forgetPasswordMutation = useForgetPasswordMutation();

  const onSubmit = (values: UpdateUserSchema) => {
    const updateValues: UpdateUser = {
      userId: user?.id,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      jobTitle: values.jobTitle ?? "",
      email: values.email.trim(),
      permission: values.permission,
      status: values.status,
    };

    // Mutate other user update
    updateProfileMutation.mutate(updateValues);
  };

  const hasEditPermissions = (status: Status) => {
    if (status === "SUSPENDED") {
      return false;
    }

    return true;
  };

  const handlePasswordReset = () => {
    // Mutate user password reset
    forgetPasswordMutation.mutate(
      { email: user?.email },
      {
        onError: async (error) => {
          // Get data for error response body
          const response =
            (await error?.response?.json()) as ForgetPasswordResponse;

          if (response?.data?.status === "SUSPENDED") {
            setMessage(PASSWORD_RESET_INACTIVE_MSG);
            setMessageOpen(true);
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2 flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">First Name*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="First Name"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={user?.status === "SUSPENDED"}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the first name for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Last Name*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={user?.status === "SUSPENDED"}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the last name for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4 flex gap-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Job Title</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                      disabled={!hasEditPermissions(user?.status)}
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

                    <FormDescription className="sr-only">
                      This is the job title for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Email*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={!hasEditPermissions(user?.status)}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the email address for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="permission"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Permission*</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!hasEditPermissions(user?.status)}
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

                    <FormDescription className="sr-only">
                      This is the permission for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Status</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!hasEditPermissions(user?.status)}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {USER_STATUSES.map((status) => (
                          <SelectItem value={status?.value} key={status?.value}>
                            {status?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is the status for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-between">
              <Button
                className="bg-brand-secondary px-6"
                type="button"
                onClick={() => handlePasswordReset()}
                data-button-action="Logged In User Reset Password"
              >
                Reset User Password
              </Button>
              <Button
                type="submit"
                className="px-6"
                disabled={user?.status === "SUSPENDED"}
                data-button-action="Update User"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
