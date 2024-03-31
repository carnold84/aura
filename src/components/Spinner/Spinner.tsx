import { ComponentPropsWithRef } from "react";

interface SpinnerProps extends ComponentPropsWithRef<"svg"> {
  size?: number;
}

const Spinner = ({ size = 32, ...rest }: SpinnerProps) => {
  return (
    <div
      className="relative"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <svg
        className="absolute animate-spin"
        height={size}
        fill="none"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.7409 43.6323C6.98707 40.1323 6 36.1814 6 32C6 17.6406 17.6406 6 32 6C39.9434 6 47.0547 9.56214 51.8239 15.1761L56.0779 10.922C50.2126 4.22733 41.6 0 32 0C14.3269 0 0 14.3269 0 32C0 36.9628 1.12976 41.6618 3.14612 45.8537L8.7409 43.6323Z"
          fill="currentcolor"
        />
      </svg>
      <svg
        className="absolute opacity-50"
        fill="none"
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        {...rest}
      >
        <path
          clipRule="evenodd"
          d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z"
          fill="currentcolor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Spinner;
