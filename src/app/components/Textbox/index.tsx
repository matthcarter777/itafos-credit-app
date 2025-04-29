type TextboxProps = {
  title: string;
  isHidde?: boolean;
  data: string;
  mask?: (data: string) => string;
}
export default function Textbox({ title, isHidde, data, mask }: TextboxProps) {
  return(
    <div hidden={isHidde}>
      <p className='font-bold'>{ title }</p>
      <p className='text-gray-500 text-sm'>{ mask ? mask(data) : data }</p>
    </div>
  )
}