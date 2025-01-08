import React, { useState } from "react";
import Swal from 'sweetalert2';  
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagitation';
import { Head, Link, usePage } from '@inertiajs/react';
import SweetAlertConfirm from "../Admin/Delete/SweetAlertConfirm";

export default function Index({ musicas }) {
  const { flash } = usePage().props;
  const [musicasState, setMusicasState] = useState(musicas.data);  

  const handleDelete = (id) => {
    fetch(`/api/musicas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          Swal.fire("Deletado!", data.message, "success").then(() => {
            const updatedMusicas = musicasState.filter(musica => musica.id !== id);
            setMusicasState(updatedMusicas); 
          });
        } else {
          Swal.fire("Erro!", data.message || "Erro desconhecido", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Erro!", "Houve um erro ao tentar excluir a música. Tente novamente.", "error");
        console.error("Erro:", error);
      });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Músicas" />

      <div className="py-4 mt-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex justify-between items-center m-4">
              <h3 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center mx-auto">Lista de Músicas</h3>
              <div className="flex space-x-4 text-gray-200">
                <Link href={route('admin.create')}>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Nova Música
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
            <table className="min-w-full table-auto divide-y divide-gray-300 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Título</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Visualizações</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Thumb</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {musicasState?.map((musica) => (
                  <tr key={musica.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{musica.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 break-words">{musica.titulo}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {new Intl.NumberFormat("pt-BR").format(musica.visualizacoes)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      <img
                        src={musica.thumb}
                        alt={`Thumb of ${musica.titulo}`}
                        className="w-12 h-12 object-cover border border-gray-300 dark:border-gray-700 rounded-3xl"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          href={route("admin.show", { id: musica.id })}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Visualizar
                        </Link>

                        <Link
                          href={route("admin.edit", { id: musica.id })}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                          Editar
                        </Link>

                        <SweetAlertConfirm
                          onConfirm={() => handleDelete(musica.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Pagination links={musicas.links} currentPage={musicas.current_page} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
