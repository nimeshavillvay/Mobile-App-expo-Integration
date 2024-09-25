import { type ReactNode } from "react";
import Balancer from "react-wrap-balancer";

const SubHeading = ({ children }: { readonly children: ReactNode }) => {
  return (
    <h2 className="text-center font-title text-3xl font-medium tracking-[-0.01875rem] text-black md:text-5xl md:tracking-[-0.036rem]">
      <Balancer>{children}</Balancer>
    </h2>
  );
};

export default SubHeading;
