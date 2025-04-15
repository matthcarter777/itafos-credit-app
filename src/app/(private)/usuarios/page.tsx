import CreateUserModal from "@/app/components/CreateUserModal/CreateUserModal";

export default function User() {


  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Usuarios</h1>
        <CreateUserModal title="+ Novo Usuário"/>
      </div>
    </div>
  );
}
