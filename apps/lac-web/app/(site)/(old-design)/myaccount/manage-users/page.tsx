import { getJobRoles, getPasswordPolicies } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UsersList from "./users-list";

export const metadata: Metadata = {
  title: "User Management",
};

const UserManagementPage = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return redirect("/");
  }

  const [jobRoles, passwordPolicies] = await Promise.all([
    getJobRoles(),
    getPasswordPolicies(),
  ]);

  return (
    <UsersList
      token={tokenCookie.value}
      jobRoles={jobRoles?.roles}
      passwordPolicies={passwordPolicies}
    />
  );
};

export default UserManagementPage;
