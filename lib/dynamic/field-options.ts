export interface Option {
  id: number;
  input: string;
  output: string;
}

export interface CustomField {
  name: string;
  type: keyof typeof FIELD_TYPES;
  required: boolean;
  dateFormat: keyof typeof DATE_FORMATS;
  decimals: number;
  enumOptions: Option[];
}

export const FIELD_TYPES = {
  string: "Text",
  number: "Number",
  date: "Date",
  enum: "Category",
  boolean: "Checkbox",
};

export const DATE_FORMATS = {
  "YYYY-MM-DD": "YYYY-MM-DD",
  "MM-DD-YYYY": "MM-DD-YYYY",
  "DD-MM-YYYY": "DD-MM-YYYY",
};

export const INITIAL_OPTIONS: Option[] = [
  {
    id: 1,
    input: "Sprint",
    output: "Q1",
  },

  {
    id: 2,
    input: "Summer",
    output: "Q2",
  },
  {
    id: 3,
    input: "Fall",
    output: "Q3",
  },
  {
    id: 4,
    input: "Winter",
    output: "Q4",
  },
  {
    id: 5,
    input: "Other",
    output: "Other",
  },
];

export const DYNAMIC_FIELD_KEY = "dynamicCustomField";

export const DEFAULT_CUSTOM_FIELD: CustomField = {
  name: "Date last ordered",
  type: "date",
  required: true,
  dateFormat: "YYYY-MM-DD",
  decimals: 2,
  enumOptions: INITIAL_OPTIONS,
};
