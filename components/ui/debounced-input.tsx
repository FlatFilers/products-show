import * as React from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "./input";

type DebounceInputProps = InputProps & {
  initialValue: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const DebouncedInput = React.forwardRef<HTMLInputElement, DebounceInputProps>(
  (
    { className, type, initialValue, onChange, debounce = 500, ...props },
    ref
  ) => {
    const [value, setValue] = React.useState<number | string>(initialValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value);

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);
    return (
      <input
        {...props}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={value}
        onChange={handleInputChange}
      />
    );
  }
);
DebouncedInput.displayName = "DebouncedInput";
export { DebouncedInput };
