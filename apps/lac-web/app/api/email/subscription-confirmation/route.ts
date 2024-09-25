import { api } from "@/_lib/api";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const GET = async (request: NextRequest) => {
  const paramsSchema = z.object({
    email_key: z.string().min(32),
  });

  const params: { [key: string]: string | string[] } = {};
  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    params[key] = value;
  }

  try {
    const { email_key } = await paramsSchema.parseAsync(params);

    // Check if the email key is valid
    await api.post("rest/subscribe", {
      json: {
        email_key,
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Invalid email key" }, { status: 400 });
  }

  redirect("/email/subscription-confirmation");
};
