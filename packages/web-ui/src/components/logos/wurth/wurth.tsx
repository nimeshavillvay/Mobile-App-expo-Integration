import { type ComponentProps } from "react";

export const Wurth = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="68"
      height="68"
      fill="none"
      viewBox="0 0 68 68"
      {...props}
    >
      <path
        fill="#E21F26"
        d="M65.657 26.908H3V.458h26.077v10.4h10.505V.458h26.075v26.45zM39.582 57.635v10.356c14.998-2.774 26.075-15.64 26.075-30.087v-.545H3v.545c0 14.448 11.086 27.313 26.077 30.087V57.635h10.505z"
      />
    </svg>
  );
};
