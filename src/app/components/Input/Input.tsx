import { FieldPath, FieldErrors, UseFormRegister } from 'react-hook-form';

type InputProps<TFormValues extends Record<string, any>> = {
  label: string;
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input<TFormValues extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  ...rest
}: InputProps<TFormValues>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold text-black">
        {label}
      </label>
      <input
        id={name}
        className={`bg-stone-50 rounded-sm h-10 px-2 border ${
          errorMessage ? 'border-red-500' : 'border-transparent'
        }`}
        {...register(name)}
        {...rest}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
}
