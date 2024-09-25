import type { TaxFormItems } from "./types";

export const downloadFile = async (
  taxFormDetails: TaxFormItems,
  stateCode: keyof TaxFormItems | undefined,
  taxFormType?: string,
) => {
  if (!stateCode) {
    return;
  }

  let url = null;
  if (stateCode == "CA" || (stateCode == "AZ" && taxFormType == "RESALE")) {
    url = taxFormDetails[stateCode].resalse_certificate[0]?.url;
  } else {
    url = taxFormDetails[stateCode].tax_exempt[0]?.url;
  }

  if (url) {
    window.open(url, "_blank");
  }
};
