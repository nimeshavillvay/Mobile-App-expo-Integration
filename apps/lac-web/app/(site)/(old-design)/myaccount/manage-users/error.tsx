"use client";

import Separator from "@/old/_components/separator";

const ManageUsersError = () => {
  return (
    <div>
      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        Manage Users
      </h2>

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <div className="mt-10 rounded-sm border border-brand-primary p-6 text-center font-wurth text-lg capitalize text-brand-primary">
        Oops... Something went wrong!
      </div>
    </div>
  );
};

export default ManageUsersError;
