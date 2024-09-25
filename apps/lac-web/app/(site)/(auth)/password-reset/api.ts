import { api } from "@/_lib/api";
import "server-only";

export const checkPasswordReset = async (userKey: string, userId: string) => {
  const response = await api
    .post("rest/register/password-reset-check", {
      json: {
        user_key: userKey,
        userid: userId,
      },
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json<{
      status_code: string;
      message: string;
    }>();

  return {
    statusCode: response.status_code,
    message: response.message,
  };
};
