type TextboxProps = {
  title?: string;
  isHidde?: boolean;
  data?: string | number;
  mask?: (data: string) => string;
}
export default function Textbox({ title, isHidde, data, mask }: TextboxProps) {
  const maskedData = data && mask ? mask(data.toString()) : data;

  return (
    <div hidden={isHidde}>
      <p className='font-bold'>{title}</p>
      <p className='text-gray-500 text-sm'>{maskedData || '-'}</p>
    </div>
  );
}