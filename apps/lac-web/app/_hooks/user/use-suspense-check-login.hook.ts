import { loginCheck } from "@/_lib/apis/shared";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCheckLogin = (token?: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "login-status", token],
    queryFn: () => loginCheck(token),
  });
};

export default useSuspenseCheckLogin;
