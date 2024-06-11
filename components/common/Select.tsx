import clsx from "clsx";
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
  placeholder,
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
          //   <select
          //     id={id}
          //     placeholder={placeholder}
          //     className={clsx(
          //       "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          //       className
          //     )}
          //     {...field}
          //   />
          <select
            id={id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
          >
            <option disabled selected hidden>Please select your role</option>
            {options?.map((item: Option) => (
              <option>{item.label}</option>
            ))}
          </select>
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default SelectComponent;
