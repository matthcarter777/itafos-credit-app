import { FieldPath, FieldErrors, UseFormRegister } from 'react-hook-form';

type TextareaProps<TFormValues extends Record<string, any>> = {
  label: string;
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea<TFormValues extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  ...rest
}: TextareaProps<TFormValues>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold text-black">
        {label}
      </label>
      <textarea
        id={name}
        className={`bg-stone-50 rounded-sm min-h-[80px] px-2 py-1 border resize-none ${
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
