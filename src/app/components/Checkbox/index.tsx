import { FieldPath, FieldErrors, UseFormRegister } from 'react-hook-form';

type CheckboxProps<TFormValues extends Record<string, any>> = {
  label: string;
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox<TFormValues extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  ...rest
}: CheckboxProps<TFormValues>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 text-black">
        <input
          id={name}
          type="checkbox"
          className="accent-blue-500"
          {...register(name)}
          {...rest}
        />
        {label}
      </label>
      {errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
}
