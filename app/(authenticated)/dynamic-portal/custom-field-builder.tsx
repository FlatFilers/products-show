import { OptionBuilder } from "./option-builder";
import { FormEvent } from "react";
import {
  CustomField,
  DATE_FORMATS,
  FIELD_TYPES,
  INITIAL_OPTIONS,
} from "@/lib/dynamic/field-options";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  customField: CustomField;
  setCustomField: (customField: CustomField) => void;
};

export const CustomFieldBuilder = ({ customField, setCustomField }: Props) => {
  const { toast } = useToast();

  if (!customField.enumOptions) {
    customField.enumOptions = INITIAL_OPTIONS;
  }

  const options = customField.enumOptions;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const { name, type, required, dateFormat, decimals, enumOptions } =
      JSON.parse(formData.get("customField") as string);

    try {
      const response = await fetch("/api/custom-field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          required,
          dateFormat,
          decimals,
          enumOptions,
        }),
      });

      const json = await response.json();
      const data = json.customField;

      const customField = {
        name: data.name,
        type: data.type,
        required: data.required,
        dateFormat: data.dateFormat,
        decimals: data.decimals,
        enumOptions: data.enumOptions,
      };

      console.log("custom field saved", customField);
    } catch (error) {
      console.error("Error saving custom field:", error);
    }
  };

  return (
    <div
      className="card-bg card-sm space-y-4"
      style={{
        boxShadow:
          "8.74046516418457px 9.711627960205078px 18.45209312438965px 0px rgba(61, 73, 100, 0.3) inset",
        backgroundColor: "white",
      }}
    >
      <div className="grid grid-cols-3 space-x-2 text-sm items-center">
        <input
          name="custom-field-name"
          type="text"
          className="text-dark border border-dark text-sm rounded px-2 py-2"
          placeholder="Date last ordered"
          value={customField.name}
          onChange={(e) => {
            setCustomField({ ...customField, name: e.target.value });
          }}
        />

        <select
          name="custom-field-type"
          className="border border-dark text-dark text-sm rounded px-2 py-2"
          value={customField.type}
          onChange={(e) => {
            setCustomField({
              ...customField,
              type: e.target.value as keyof typeof FIELD_TYPES,
            });
          }}
        >
          {Object.keys(FIELD_TYPES).map((key) => {
            return (
              <option key={key} value={key}>
                {FIELD_TYPES[key as keyof typeof FIELD_TYPES]}
              </option>
            );
          })}
        </select>

        <div className="flex flex-row items-center justify-between">
          <input
            id="custom-field-required-validation"
            name="custom-field-required-validation"
            className="inline-flex justify-self-start border border-dark"
            type="checkbox"
            checked={customField.required}
            onChange={(e) => {
              setCustomField({ ...customField, required: e.target.checked });
            }}
          />

          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              id="customField"
              name="customField"
              value={JSON.stringify(customField)}
            />

            <div className="flex flex-row items-center space-x-2">
              <button
                onClick={() => {
                  toast({
                    title: "Saved custom field",
                  });
                }}
                className="bg-dynamic-portal px-5 md:px-12 py-1 md:py-2 rounded-xl"
                style={{
                  boxShadow:
                    "8.74046516418457px 9.711627960205078px 18.45209312438965px 0px rgba(61, 73, 100, 0.3) inset",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-dark w-full">
        {customField.type === "date" && (
          <div className="flex flex-row items-center justify-start space-x-2">
            <label className="block text-xs font-semibold">Format</label>
            <select
              name="custom-field-type"
              className="border border-dark text-sm rounded px-2 py-2"
              value={customField.dateFormat}
              onChange={(e) => {
                setCustomField({
                  ...customField,
                  dateFormat: e.target.value as keyof typeof DATE_FORMATS,
                });
              }}
            >
              {Object.keys(DATE_FORMATS).map((key) => {
                return (
                  <option key={key} value={key}>
                    {DATE_FORMATS[key as keyof typeof DATE_FORMATS]}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {customField.type === "number" && (
          <div className="flex flex-row items-center justify-start space-x-2">
            <label className="block text-xs font-semibold">
              Decimal Places
            </label>
            <input
              name="number-decimal-places"
              type="number"
              min={0}
              step={1}
              className="border border-dark text-sm rounded px-2 py-2 w-[50px]"
              placeholder="2"
              defaultValue={customField.decimals}
              onChange={(e) => {
                setCustomField({
                  ...customField,
                  decimals: parseInt(e.target.value),
                });
              }}
            />
          </div>
        )}

        {customField.type === "enum" && (
          <div className="space-y-2">
            <label
              htmlFor="custom-field-required-validation"
              className="block text-sm font-semibold cursor-pointer"
            >
              Options
            </label>
            <OptionBuilder
              options={options.sort((a, b) => a.id - b.id)}
              updateInput={(option, value) => {
                const filteredOptions = options.filter((o) => {
                  return o.id !== option.id;
                });

                setCustomField({
                  ...customField,
                  enumOptions: [
                    ...filteredOptions,
                    { ...option, input: value },
                  ],
                });
              }}
              updateOutput={(option, value) => {
                const filteredOptions = options.filter((o) => {
                  return o.id !== option.id;
                });

                setCustomField({
                  ...customField,
                  enumOptions: [
                    ...filteredOptions,
                    { ...option, output: value },
                  ],
                });
              }}
              addNewOption={() => {
                const maxId = options.reduce((max, option) => {
                  return Math.max(max, option.id);
                }, 0);

                setCustomField({
                  ...customField,
                  enumOptions: [
                    ...options,
                    { id: maxId + 1, input: "", output: "" },
                  ],
                });
              }}
              removeOption={(option) => {
                const filteredObjects = options.filter((o) => {
                  return o.id !== option.id;
                });

                setCustomField({
                  ...customField,
                  enumOptions: filteredObjects,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
