"use client";

import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Switch } from "@repo/web-ui/components/icons/switch";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { useRouter } from "next/navigation";

const OSRDetailsView = ({ token }: { readonly token: string }) => {
  const loginCheckResponse = useSuspenseCheckLogin(token);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const loginCheckData = loginCheckResponse.data;

  if (loginCheckData?.status_code == "NOT_LOGGED_IN") {
    return null;
  }

  return (
    loginCheckData?.isLoggedInAsCustomer && (
      <div className="grid w-full grid-cols-2 items-center gap-4 break-words pr-6 text-xs xs:text-sm sm:w-auto">
        <div>
          <span>Logged in as&nbsp;</span>

          {loginCheckData?.status_code === "OK" && (
            <span className="font-bold">{loginCheckData.user.billto}</span>
          )}
        </div>

        <div className="flex flex-row">
          <Separator
            orientation="vertical"
            className="h-auto w-px bg-brand-gray-500"
          />
          <button
            className="btnAction ml-4 flex items-center gap-2 font-semibold"
            onClick={() =>
              logoutMutation.mutate(undefined, {
                onSuccess: () => {
                  router.replace("/osr/dashboard");
                },
              })
            }
            data-button-action="OSR Switch Back"
          >
            Switch back{" "}
            <Switch width={16} data-button-action="OSR Switch Back" />
          </button>
        </div>
      </div>
    )
  );
};

export default OSRDetailsView;
