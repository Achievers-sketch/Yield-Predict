import type { SVGProps } from "react";

export const Icons = {
  eth: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...props}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M16 3L15.93 18.52L9 21.62L16 3Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M16 3L23 21.62L16.07 18.52L16 3Z"
        fill="currentColor"
      />
      <path
        d="M16 29.5V20.13L9 21.62L16 29.5Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M16 29.5L23 21.62L16 20.13V29.5Z"
        fill="currentColor"
      />
      <path
        d="M16.07 18.52L9 21.62L16 3L16.07 18.52Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M16 20.13L9 21.62L16 29.5V20.13Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  ),
  usdt: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...props}
      fill="none"
    >
      <circle cx="16" cy="16" r="14" fill="#26A17B" />
      <path
        d="M13.62 10.32H20.38V12.78H17.77V21.68H15.22V12.78H12.61V10.32H13.62Z"
        fill="white"
      />
    </svg>
  ),
};
