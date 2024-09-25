import type { Address } from "@/_lib/types";

type FullAddressProps = {
  readonly address: Address | undefined;
  readonly showCountry?: boolean;
};

const FullAddress = ({ address, showCountry = false }: FullAddressProps) => {
  if (!address) {
    return null;
  }

  return (
    <>
      {address?.streetAddress && `${address?.streetAddress}, `}
      {address?.locality && `${address?.locality}, `}
      {address?.region}
      {address?.county && `, ${address?.county}`}
      &nbsp;
      {address?.postalCode}
      {address?.zip4 && `-${address.zip4}`}
      {showCountry && `, ${address?.countryName}`}
    </>
  );
};

export default FullAddress;
