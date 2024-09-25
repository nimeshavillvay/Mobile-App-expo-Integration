import useUpdateProfileMutation from "@/_hooks/user/use-update-profile-mutation.hook";
import type { PasswordPolicies, UpdateUser } from "@/_lib/types";
import { checkPasswordComplexity } from "@/_lib/utils";
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
import type { Role } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { USER_PERMISSIONS, USER_STATUSES } from "./constants";
import type { UserProfile } from "./types";

const updateProfileSchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter first name.").max(40),
    lastName: z.string().trim().min(1, "Please enter last name.").max(40),
    jobTitle: z.string().optional(),
    email: z
      .string()
      .trim()
      .min(1, "Please enter email address.")
      .email("Please enter a valid email address."),
    permission: z.string().min(1, "Please enter permission type."),
    status: z.string(),
    password: z.string(),
    confirmPassword: z.string().or(z.literal("")),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

type UpdateProfileProps = {
  readonly user: UserProfile;
  readonly jobRoles: Role[];
  readonly passwordPolicies: PasswordPolicies;
  readonly isOsrNotLoggedInAsCustomer: boolean;
};

const ProfileUpdateForm = ({
  user,
  jobRoles,
  passwordPolicies,
  isOsrNotLoggedInAsCustomer,
}: UpdateProfileProps) => {
  const refinedSchema = updateProfileSchema.superRefine(
    ({ password }, context) =>
      checkPasswordComplexity({
        password,
        passwordPolicies,
        context,
        allowEmptyPassword: true,
      }),
  );

  type UpdateProfileSchema = z.infer<typeof refinedSchema>;

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(refinedSchema),
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      jobTitle: user?.role,
      email: user?.email,
      permission: user?.permission,
      status: user?.status,
      password: "",
      confirmPassword: "",
    },
  });

  const updateProfileMutation = useUpdateProfileMutation();

  const onSubmit = (values: UpdateProfileSchema) => {
    const updateValues: UpdateUser = {
      userId: user?.id,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      jobTitle: values.jobTitle ?? "",
      email: values.email.trim(),
      permission: values.permission,
      status: values.status,
    };

    if (values.password) {
      updateValues.password = values.password;
    }

    // Mutate your profile update
    updateProfileMutation.mutate(updateValues);
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
                      This is the first name of your profile
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
                      This is the last name of your profile
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>

            {!isOsrNotLoggedInAsCustomer && (
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0.5">
                      <FormLabel className="font-bold">Job Title</FormLabel>

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

                      <FormDescription className="sr-only">
                        This is the job title of your profile
                      </FormDescription>

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

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={true}
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
                        This is the permission of your profile
                      </FormDescription>

                      <FormMessage className="text-xs dark:text-brand-primary" />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="col-span-1 flex flex-col">
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
                      {...field}
                    />
                  </FormControl>

                  <FormDescription className="sr-only">
                    This is the email address of your profile
                  </FormDescription>

                  <FormMessage className="text-xs dark:text-brand-primary" />
                </FormItem>
              )}
            />

            {!isOsrNotLoggedInAsCustomer && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Status</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={true}
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
                      This is the status of your profile
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="col-span-2 flex gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-0.5">
                  <FormLabel className="font-bold">New Password</FormLabel>

                  <FormControl>
                    <Input
                      className="text-[15px] placeholder:text-brand-gray-400"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription className="sr-only">
                    This is the first name of your profile
                  </FormDescription>

                  <FormMessage className="text-xs dark:text-brand-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-0.5">
                  <FormLabel className="font-bold">Confirm Password</FormLabel>

                  <FormControl>
                    <Input
                      className="text-[15px] placeholder:text-brand-gray-400"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription className="sr-only">
                    This is the first name of your profile
                  </FormDescription>

                  <FormMessage className="text-xs dark:text-brand-primary" />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3 flex justify-end">
            <Button
              type="submit"
              className="px-6"
              data-button-action="User Update Profile"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;
