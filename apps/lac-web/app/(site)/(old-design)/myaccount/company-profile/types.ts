import type { Address } from "@/_lib/types";

export type AddressWithUuid = Address & {
  uuid: string;
};

export type AddressCheckSuggestionsWithUuid = {
  checkType: string;
  message: string;
  suggestions: AddressWithUuid[];
};
