import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";
import type { BranchType } from "./branch-data";
import { branchData } from "./branch-data";

export const metadata: Metadata = {
  title: "Our Branches",
};

const Branch = ({ branchData }: { readonly branchData: BranchType }) => {
  return (
    <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
      <h3 className="mb-4 text-xl font-semibold">{branchData.branchName}</h3>
      <address>
        <ul>
          {branchData.address.map((address) => (
            <li className="font-semibold" key={address}>
              {address}
            </li>
          ))}

          {branchData.phone.map((phone) => (
            <li
              key={phone.phoneNo}
              className="w-fit text-blue-600 hover:text-blue-800 hover:underline"
            >
              <a
                href={phone.link}
                className="btnAction"
                data-btn-action="Click Branch Phone"
              >
                {phone.phoneNo}
              </a>
            </li>
          ))}

          {branchData.fax?.map((fax) => <li key={fax}>{fax}</li>)}
        </ul>
      </address>
    </div>
  );
};

const BranchFinderPage = () => {
  return (
    <div className="container">
      <MainTitle className="mt-8">Our Branches</MainTitle>

      <p>
        If you are vision-impaired or have some other impairment covered by the
        Americans with Disabilities Act or a similar law, and you wish to
        discuss potential accommodations related to using this website, please
        contact Wurth Louis and Company Customer Service at{" "}
        <a
          href="tel:8004224389"
          className="btnAction text-blue-700 hover:text-blue-900 hover:underline"
          data-btn-action="Click Branch Customer Service Phone"
        >
          (800) 422-4389
        </a>
        , and/or email <strong>CService@wurthlac.com</strong>.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 text-wrap break-words text-gray-600 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {branchData.map((branch) => (
          <Branch key={branch.branchName} branchData={branch} />
        ))}
      </div>
    </div>
  );
};

export default BranchFinderPage;
