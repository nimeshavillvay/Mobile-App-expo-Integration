import { type ComponentProps } from "react";

const VisuallyHidden = (props: Omit<ComponentProps<"span">, "className">) => {
  return <span className="sr-only" {...props} />;
};

export default VisuallyHidden;
