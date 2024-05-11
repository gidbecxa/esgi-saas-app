import React from "react";

type CheckmarkIconProps = React.SVGProps<SVGSVGElement>;

export const CheckmarkIcon: React.FC<CheckmarkIconProps> = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.8333 3.83331C18.225 3.44165 18.225 2.80831 17.8333 2.41665C17.4417 2.025 16.8083 2.025 16.4167 2.41665L8.08333 10.75L4.58333 7.25C4.19167 6.85831 3.55833 6.85831 3.16667 7.25C2.775 7.64165 2.775 8.275 3.16667 8.66665L7.66667 13.1666C8.05833 13.5583 8.69167 13.5583 9.08333 13.1666L17.8333 4.41665C18.225 4.025 18.225 3.39165 17.8333 3.83331Z"
      fill="currentColor"
    />
  </svg>
);
