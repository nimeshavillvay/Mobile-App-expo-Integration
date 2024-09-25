import { Button } from "@/old/_components/ui/button";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import type { Role } from "@/old/_lib/types";
import { useState } from "react";
import {
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import type { UserProfile } from "./types";
import useDeleteOtherUserMutation from "./use-delete-other-user-mutation.hook";
import UserStatusBadge from "./user-status-badge";
import UserUpdateForm from "./user-update-form";

type UserRowProps = {
  readonly user: UserProfile;
  readonly index: number;
  readonly jobRoles: Role[];
};

const UserRow = ({ user, index, jobRoles }: UserRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  const deleteOtherUserMutation = useDeleteOtherUserMutation();

  return (
    <>
      <TableRow
        key={user?.id}
        className={index % 2 === 0 ? "bg-white" : "bg-brand-gray-100"}
      >
        <TableCell className="align-middle">{user?.email}</TableCell>

        <TableCell className="text-center align-middle capitalize">
          {user?.permission.toLowerCase()}
        </TableCell>

        <TableCell className="text-center">
          <div className="flex justify-center">
            <UserStatusBadge status={user?.status} />
          </div>
        </TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end">
            <div className="cursor-pointer px-3 text-brand-gray-500">
              <MdDeleteOutline
                className="self-center text-2xl leading-none"
                onClick={() => setIsOpenDelete(true)}
              />
            </div>
            <Button
              className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <>
                  Open
                  <MdKeyboardArrowDown
                    className="text-xl leading-none"
                    data-button-action="Admin View Other User"
                  />
                </>
              ) : (
                <>
                  Close
                  <MdKeyboardArrowUp
                    className="text-xl leading-none"
                    data-button-action="Admin Collapse Other User"
                  />
                </>
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isOpen && (
        <TableRow>
          <TableCell colSpan={4}>
            <UserUpdateForm
              jobRoles={jobRoles}
              user={user}
              setMessage={setMessage}
              setMessageOpen={setIsOpenMessage}
            />
          </TableCell>
        </TableRow>
      )}

      <ActionConfirmationDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title="Confirm Action"
        text="Do you really want to delete these records?"
        onConfirm={() => {
          deleteOtherUserMutation.mutate({ userId: user?.id });
          setIsOpenDelete(false);
        }}
        okText="Confirm"
      />

      <ActionConfirmationDialog
        open={isOpenMessage}
        onOpenChange={setIsOpenMessage}
        title="Manage User"
        text={message}
        textColor="primary"
        onConfirm={() => setIsOpenMessage(false)}
        showCancelBtn={false}
      />
    </>
  );
};

export default UserRow;
