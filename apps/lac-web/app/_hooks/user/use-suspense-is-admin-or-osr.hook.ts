import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";

const useSuspenseIsAdminOrOsr = (token: string) => {
  const usersListQuery = useSuspenseUsersList(token);
  const { permission } = usersListQuery.data.manageContact.yourProfile;
  const isAdmin = permission.toLowerCase() === "admin";

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isOsr =
    checkLoginQuery.data?.status_code === "OK" &&
    !!checkLoginQuery.data?.sales_rep_id;

  return isAdmin || isOsr;
};

export default useSuspenseIsAdminOrOsr;
