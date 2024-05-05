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
          <label
            className="font-display text-sm font-light text-neutral-900"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          className="border border-neutral-200 px-2.5 py-1.5 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none"
          id={id}
          ref={ref}
          {...rest}
        />
        {error && <p className="font-display text-xs text-red-800">{error}</p>}
      </div>
    );
  },
);

export default TextField;
