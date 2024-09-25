import { api } from "@/_lib/api";
import type { Status } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

type Contact = {
  id: string;
  status: Status;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  role_description: string;
  permission: string;
  sold_to_status: string;
};

type ManageContact = {
  manage_contact: {
    your_profile: Contact;
    contact_list: [Contact];
  };
};

const mapContact = (contact: Contact) => ({
  id: Number(contact.id),
  status: contact.status,
  firstName: contact.first_name,
  lastName: contact.last_name,
  email: contact.email,
  role: contact.role,
  roleDescription: contact.role_description,
  permission: contact.permission,
  soldToAccountStatus: contact.sold_to_status,
});

const useSuspenseUsersList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "manage-users", token],
    queryFn: () =>
      api
        .get("rest/my-account/users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .json<ManageContact>(),
    select: (data) => {
      const { your_profile, contact_list } = data.manage_contact;

      return {
        manageContact: {
          yourProfile: mapContact(your_profile),
          contactList: contact_list.map(mapContact),
        },
      };
    },
  });
};

export default useSuspenseUsersList;
