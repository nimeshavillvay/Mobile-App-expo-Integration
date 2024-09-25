import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import Separator from "@/old/_components/separator";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShoppingList from "./shopping-list";

export const metadata: Metadata = {
  title: "My Shopping Lists",
};

const MyShoppingListsPage = () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken) {
    return redirect("/");
  }

  return (
    <>
      <div className="px-4 pt-4 md:px-0 md:pt-0">
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          My Shopping Lists
        </h2>

        <Separator
          orientation="horizontal"
          className="mb-4 h-px flex-1 bg-brand-primary"
        />
      </div>

      <ShoppingList token={sessionToken?.value} />
    </>
  );
};

export default MyShoppingListsPage;
