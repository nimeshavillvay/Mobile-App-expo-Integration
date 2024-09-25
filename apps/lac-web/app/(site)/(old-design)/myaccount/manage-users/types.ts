import type { Status } from "@/_lib/types";

export type Permission = "ADMIN" | "BUYER";

export type UserProfile = {
  id: number;
  status: Status;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleDescription: string;
  permission: string;
  soldToAccountStatus: string;
};

export type ManageContact = {
  your_profile: UserProfile;
  contact_list: UserProfile[];
};

export type ForgetPasswordResponse = {
  data: { status: Status };
  message: string | null;
  isSuccess: boolean;
};

export type CurrentUser = {
  email: string;
};

// Types used in old-design
// TODO: Remove these types once old-design is removed
export type UpdateField = {
  field: string;
  value: string;
};

export type SignedData = {
  payload: string;
  sign: string;
};

export type ApproveContact = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  permission: Permission;
  signedData: SignedData;
};

export type ManageUsers = {
  approve_contacts: ApproveContact[];
  manage_contact: ManageContact;
};
