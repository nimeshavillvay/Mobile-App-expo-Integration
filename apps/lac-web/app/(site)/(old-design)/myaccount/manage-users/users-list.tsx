"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import type { PasswordPolicies } from "@/_lib/types";
import Separator from "@/old/_components/separator";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import type { Role } from "@/old/_lib/types";
import { useState } from "react";
import {
  MdAccountBox,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdPersonAdd,
  MdSupervisorAccount,
} from "react-icons/md";
import AddUserDataDialog from "./add-user-data-dialog";
import AddUserEmailDialog from "./add-user-email-dialog";
import ProfileUpdateForm from "./profile-update-form";
import UserRow from "./user-row";
import UserStatusBadge from "./user-status-badge";

const UsersList = ({
  token,
  jobRoles,
  passwordPolicies,
}: {
  readonly token: string;
  readonly jobRoles: Role[];
  readonly passwordPolicies: PasswordPolicies;
}) => {
  const [showYourProfile, setShowYourProfile] = useState(false);
  const [showCurrentUsers, setShowCurrentUsers] = useState(false);
  const [openAddUserEmailDialog, setOpenAddUserEmailDialog] = useState(false);
  const [openAddUserDataDialog, setOpenAddUserDataDialog] = useState(false);
  const [addUserDataDialogEmail, setAddUserDataDialogEmail] = useState("");

  const usersListQuery = useSuspenseUsersList(token);
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const yourProfile = usersListQuery?.data?.manageContact?.yourProfile ?? null;
  const currentUsers = usersListQuery?.data?.manageContact?.contactList ?? null;

  const { permission } = usersListQuery.data.manageContact.yourProfile;

  const isOSRLoggedInAsCustomer =
    checkLoginQuery.data?.status_code == "OK" &&
    checkLoginQuery.data?.isLoggedInAsCustomer;

  const isAdmin =
    permission.toLowerCase() === "admin" &&
    isOSRLoggedInAsCustomer === undefined;

  const isOsr =
    checkLoginQuery.data?.status_code === "OK" &&
    !!checkLoginQuery.data?.sales_rep_id;

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-wurth text-xl font-medium text-brand-primary">
          Manage Users
        </h2>
        {(isAdmin || isOSRLoggedInAsCustomer) && (
          <Button
            type="submit"
            className="mb-2 px-6"
            onClick={() => setOpenAddUserEmailDialog(true)}
            data-button-action="Admin Open Add New User Dialog"
          >
            <MdPersonAdd
              className="text-xl leading-none"
              data-button-action="Admin Open Add New User Dialog"
            />
            Add user
          </Button>
        )}
      </div>

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <h6 className="my-5 flex font-wurth text-base font-medium text-brand-gray-500">
        <MdAccountBox className="self-center text-2xl leading-none" />
        &nbsp;Update Your Profile
      </h6>

      {/* Update Your Profile Section */}
      <Collapsible open={showYourProfile} onOpenChange={setShowYourProfile}>
        <Table>
          <TableCaption className="sr-only">
            Update your profile section.
          </TableCaption>

          <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
            <TableRow>
              <TableHead>Email</TableHead>

              <TableHead className="text-center">Permission</TableHead>

              <TableHead className="text-center">Status</TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="border border-brand-gray-200">
            <TableRow>
              <TableCell>{yourProfile?.email}</TableCell>

              <TableCell className="text-center">
                {yourProfile?.permission}
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center">
                  <UserStatusBadge status={yourProfile?.status} />
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end">
                  <CollapsibleTrigger asChild>
                    <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
                      {showYourProfile ? (
                        <>
                          Close
                          <MdKeyboardArrowUp
                            className="text-xl leading-none"
                            data-button-action="Close Your Profile"
                          />
                        </>
                      ) : (
                        <>
                          Open
                          <MdKeyboardArrowDown
                            className="text-xl leading-none"
                            data-button-action="View Your Profile"
                          />
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </TableCell>
            </TableRow>

            <CollapsibleContent asChild>
              <TableRow>
                <TableCell colSpan={4}>
                  <ProfileUpdateForm
                    jobRoles={jobRoles}
                    user={yourProfile}
                    passwordPolicies={passwordPolicies}
                    isOsrNotLoggedInAsCustomer={
                      isOsr && !isOSRLoggedInAsCustomer
                    }
                  />
                </TableCell>
              </TableRow>
            </CollapsibleContent>
          </TableBody>
        </Table>
      </Collapsible>

      {/* Current Users Section */}
      {(isAdmin || isOSRLoggedInAsCustomer) && (
        <Collapsible open={showCurrentUsers} onOpenChange={setShowCurrentUsers}>
          <div className="my-5 flex justify-between">
            <h6 className="flex font-wurth text-base font-medium capitalize text-brand-gray-500">
              <MdSupervisorAccount className="self-center text-2xl leading-none" />
              &nbsp;Current Users On This Account
            </h6>

            <CollapsibleTrigger asChild>
              <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
                {showCurrentUsers ? (
                  <>
                    Hide
                    <MdKeyboardArrowUp
                      className="text-xl leading-none"
                      data-button-action="Hide Current User"
                    />
                  </>
                ) : (
                  <>
                    Show
                    <MdKeyboardArrowDown
                      className="text-xl leading-none"
                      data-button-action="View Current User"
                    />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            {currentUsers && currentUsers?.length > 0 ? (
              <Table>
                <TableCaption className="sr-only">
                  Current users on this account section.
                </TableCaption>

                <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
                  <TableRow>
                    <TableHead>Email</TableHead>

                    <TableHead className="text-center">Permission</TableHead>

                    <TableHead className="text-center">Status</TableHead>

                    <TableHead />
                  </TableRow>
                </TableHeader>

                <TableBody className="border border-brand-gray-200 text-brand-gray-500">
                  {currentUsers.map((user, index) => (
                    <UserRow
                      key={user?.id}
                      user={user}
                      index={index}
                      jobRoles={jobRoles}
                    />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="mt-10 rounded-sm border border-brand-gray-300 p-6 text-center font-wurth text-lg capitalize text-brand-gray-300">
                Current Users Not Available!
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-gray-200"
      />

      <AddUserEmailDialog
        open={openAddUserEmailDialog}
        setOpen={setOpenAddUserEmailDialog}
        setOpenAddUserDataDialog={setOpenAddUserDataDialog}
        setEmail={setAddUserDataDialogEmail}
        currentUsers={currentUsers}
      />

      <AddUserDataDialog
        jobRoles={jobRoles}
        open={openAddUserDataDialog}
        email={addUserDataDialogEmail}
        setOpen={setOpenAddUserDataDialog}
        passwordPolicies={passwordPolicies}
      />
    </>
  );
};

export default UsersList;
