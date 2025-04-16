import {
  FieldPath,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

type SelectProps<TFormValues extends Record<string, any>> = {
  label: string;
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  options: { id: string; nome: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select<TFormValues extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  options,
  ...rest
}: SelectProps<TFormValues>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold text-black mb-1">
        {label}
      </label>
      <select
        id={name}
        className={`bg-stone-50 rounded-sm h-10 px-2 border ${
          errorMessage ? 'border-red-500' : 'border-transparent'
        }`}
        {...register(name)}
        {...rest}
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
}
