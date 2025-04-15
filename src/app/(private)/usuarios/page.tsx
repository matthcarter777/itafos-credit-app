export default function User() {
  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Usuarios</h1>
        <button 
          className="
            bg-emerald-700 
            text-stone-50 
            rounded-sm 
            h-10 
            font-bold 
            hover:bg-emerald-800 
            transition-colors
            p-3
            flex
            items-center
            justify-center
          " 
          type="button"
                >
          + Novo Usuário
        </button>
      </div>
    </div>
  );
}
