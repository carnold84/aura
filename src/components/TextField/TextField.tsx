import { ComponentPropsWithoutRef, forwardRef, useId } from "react";

interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  error?: string;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, label, ...rest }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm text-neutral-900" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className="border border-neutral-200 px-2.5 py-1.5 text-base text-neutral-900 focus:border-neutral-400 focus:outline-none"
          id={id}
          ref={ref}
          {...rest}
        />
        {error && <p>{error}</p>}
      </div>
    );
  },
);

export default TextField;
