/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"; // Adjust the path based on your project structure
import { Users } from "@/types/users";
import Toast from "@/components/ui/Toast";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  const [users, setUsers] = useState<Users | null>(null);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Users[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setId(resolved.id);
    }
    resolveParams();
  }, [params]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Greška pri učitavanju podataka.");
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    }

    fetchUsers();
  }
    , [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUsers(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch todo.");
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };
  const openDeleteConfirmModal = (id: string | number) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const closeDeleteConfirmModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };
  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // Toast nestaje posle 2.5s
  }
  const router = useRouter();
  const deleteTodo = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== Number(id)));
    setIsModalOpen(false);

    showToast('Korisnkje uspešno obrisan!');
    setTimeout(() => router.push('/admin/users'), 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white">
      <div className=" w-full mx-auto p-4 bg-white ">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 bg-white border-2 border-gray-100 rounded pl-4 pr-4">
          {users && (
            <div className="flex-col text-left p-2 ">
              <h1 className="text-2xl font-bold-1 p-2 text-left">Detalji Korisnika</h1>
              {/* <p className="p-3" ><>Zadatak:</> {users.name}</p> */}
              <p className="p-3"><>Email:</> {users.email}</p>
              <p className="p-3"><>Password:</> {users.password ? "Da" : "Ne"}</p>
              <p className="p-3"><>Role:</> {users.role || "N/A"}</p>

              <div className="flex gap-3 mt-7 w-full">
                <Link href="/admin/users">
                  <button className="px-4 py-2 rounded bg-black text-white hover:bg-yellow-600 transition">
                    Nazad
                  </button>
                </Link>
                <Link href={`/admin/users/update/${users.id}`} >
                  <button className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition">Izmjeni</button>
                </Link>
                <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition " onClick={() => openDeleteConfirmModal(users.id)}>Briši</button>
              </div>
            </div>
          )}
        </form>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteConfirmModal}
          onConfirm={() => deleteTodo(String(selectedItemId!))}
          itemId={selectedItemId!}
          title={users?.email} // <-- OVO JE KLJUČNO
        />
        <Toast message={toast} />
      </div>
    </div>
  );
};
