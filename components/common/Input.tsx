import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  id: string;
  className: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const InputComponent: React.FC<InputProps> = ({ id, className, name, placeholder, type = "text" }) => {
  const { control } = useFormContext();
  return (
    <div className="mt-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              className
            )}
            {...field}
          />
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default InputComponent;
