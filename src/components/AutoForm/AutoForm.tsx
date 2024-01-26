import { FieldValues, useForm } from "react-hook-form";

import {
  /* ErrorType, */
  Field,
  FieldMapping,
} from "./types";

/* const getDefaultErrorMessage = (type: ErrorType | string) => {
  switch (type) {
    case "required":
      return (label: string) => `${label} is required.`;
    default:
      return (label: string) => `There is an error in ${label}.`;
  }
}; */

const getDefaultValues = (fields: Field[]) => {
  return fields.reduce<FieldValues>((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue.name]: currentValue.defaultValue ?? "",
    };
  }, {});
};

const fieldMapping: FieldMapping = {
  text: "input",
};

export interface AutoFormSchema {
  fields: Field[];
}

export interface AutoFormProps {
  onCancel?: () => void;
  onSubmit: (data: FieldValues) => void;
  schema: AutoFormSchema;
}

const AutoForm = ({
  onCancel,
  onSubmit: onSubmitProp,
  schema,
}: AutoFormProps) => {
  const {
    /* formState: { errors }, */
    handleSubmit,
    register,
  } = useForm({
    defaultValues: getDefaultValues(schema.fields),
  });

  const onSubmit = (data: FieldValues) => {
    onSubmitProp(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-end gap-3">
        {schema.fields.map(({ label, name, required, type }) => {
          const Component = fieldMapping[type];
          //const error = errors[name];

          return (
            <div key={name}>
              {label && <label>{label}</label>}
              <Component type={type} {...register(name, { required })} />
              {/* {error && (
                <div className="mt-2 text-sm text-red-800">
                  {error?.message
                    ? error.message
                    : getDefaultErrorMessage(error.type)(label ?? name)}
                </div>
              )} */}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && <button onClick={onCancel}>Cancel</button>}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AutoForm;
