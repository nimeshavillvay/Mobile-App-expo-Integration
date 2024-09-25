import { type ComponentProps } from "react";

const AddToFavoritesIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <path
        stroke="#00ADEF"
        d="M15.5 19.5V0.5H0.5V19.5L8 15.5L15.5 19.5Z"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AddToFavoritesIcon;
