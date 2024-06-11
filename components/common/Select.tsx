import { Controller, useFormContext } from "react-hook-form";

interface Option {
  value: string;
  label: string;
  [key: string]: string;
}
interface InputProps {
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  options?: Option[];
}

const SelectComponent: React.FC<InputProps> = ({
  id,
  className,
  name,
  placeholder = "Please select",
  type = "text",
  options,
}) => {
  const { control } = useFormContext();
  return (
    <div className="mt-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
            {...field}>
            <option disabled selected hidden>
              {placeholder}
            </option>
            {options?.map((item: Option, index: number) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default SelectComponent;
