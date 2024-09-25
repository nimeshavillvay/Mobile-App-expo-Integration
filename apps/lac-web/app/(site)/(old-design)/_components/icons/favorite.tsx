import { type ComponentProps } from "react";

const FavoriteIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="19"
      fill="none"
      viewBox="0 0 21 19"
      {...props}
    >
      <path
        d="M15.5 19.5V0.5H0.5V19.5L8 15.5L15.5 19.5Z"
        fill="#55a213"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FavoriteIcon;
