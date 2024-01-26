import { z } from "zod";

const fieldTypeSchema = z.literal("input");
type FieldType = z.infer<typeof fieldTypeSchema>;

const fieldSchema = z.intersection(
  z.object({
    defaultValue: z.string().optional(),
    label: z.string().optional(),
    name: z.string(),
    required: z.union([z.string(), z.boolean()]).optional(),
  }),
  z.object({
    type: z.literal("text"),
    value: z.string().optional(),
  }),
);

export type Field = z.infer<typeof fieldSchema>;

export type AutoFormSchema = {
  fields: Field[];
};

export interface FieldMapping {
  [x: string]: FieldType;
}

export type ErrorType = "required";
