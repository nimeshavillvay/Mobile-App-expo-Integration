"use client";

import { api } from "@/_lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});
type FormSchema = z.infer<typeof formSchema>;

const Subscribe = () => {
  const id = useId();
  const emailId = `email-${id}`;
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: (email: string) =>
      api
        .post("rest/subscribe", {
          json: { email },
        })
        .then((res) => res.json<string>()),
    onSuccess: () => {
      reset();
      toast({
        title: "Sent confirmation email",
        description: "Please check your email to confirm your subscription.",
      });
      router.push("/subscribe-thank-you");
    },
  });

  const onSubmit = (values: FormSchema) => {
    subscribeMutation.mutate(values.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <h3 className="text-center text-base font-semibold text-wurth-gray-800 md:text-left">
        Get the latest deals and more.
      </h3>

      <div className="flex flex-row items-center gap-2">
        <Label htmlFor={emailId} className="sr-only">
          Email
        </Label>

        <Input
          {...register("email")}
          id={emailId}
          type="email"
          required
          placeholder="Email"
          className="flex-1 rounded border-wurth-gray-250 shadow-sm"
          disabled={subscribeMutation.isPending}
        />

        <Button
          type="submit"
          className="shrink-0"
          disabled={subscribeMutation.isPending}
          data-button-action="Subscribe"
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default Subscribe;
