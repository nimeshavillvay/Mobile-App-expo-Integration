import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// This endpoint is used by X-Cart users to directly log into the site as
// an admin
export const POST = async (request: NextRequest) => {
  const paramsSchema = z.object({
    "X-AUTH-TOKEN": z.literal(process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY),
    name: z.literal(SESSION_TOKEN_COOKIE),
    value: z.string(),
    expires: z.string(),
  });

  const params: { [key: string]: FormDataEntryValue } = {};
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    params[key] = value;
  }

  try {
    const { name, value, expires } = await paramsSchema.parseAsync(params);

    // Set the cookie
    const cookiesStore = cookies();
    cookiesStore.set(name, value, {
      expires: new Date(expires),
      path: "/",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  redirect("/");
};
