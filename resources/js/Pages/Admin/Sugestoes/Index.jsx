import React, { useState } from "react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagitation";
import { Head, usePage } from "@inertiajs/react";

export default function Index({ musicas }) {
  const { flash } = usePage().props;
  const [musicasState, setMusicasState] = useState(musicas.data);

  const handleApprove = (id) => {
    Swal.fire({
      title: "Aprovar música?",
      text: "Você realmente deseja aprovar essa música?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, aprovar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(route("musica.approve", { id: id }))
          .then((response) => {
            Swal.fire("Aprovada!", "A música foi aprovada com sucesso.", "success");
            setMusicasState((prevMusicas) =>
              prevMusicas.map((musica) =>
                musica.id === id ? { ...musica, status: "aprovada" } : musica
              )
            );
          })
          .catch((error) => {
            Swal.fire("Erro", "Não foi possível aprovar a música.", "error");
          });
      }
    });
  };

  const handleDisapproval = (id) => {
    Swal.fire({
      title: "Reprovar música?",
      text: "Você realmente deseja reprovar essa música?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, reprovar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(route("musica.disapprove", { id: id }))
          .then((response) => {
            Swal.fire("Reprovada!", "A música foi reprovada com sucesso.", "success");
            setMusicasState((prevMusicas) =>
              prevMusicas.map((musica) =>
                musica.id === id ? { ...musica, status: "reprovada" } : musica
              )
            );          
          })
          .catch((error) => {
            Swal.fire("Erro", "Não foi possível reprovar a música.", "error");
          });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Músicas" />

      <div className="py-4 mt-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex justify-between items-center m-4">
              <h3 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center mx-auto">
                Lista de Músicas
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
            <table className="min-w-full table-auto divide-y divide-gray-300 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Visualizações</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Thumb</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {musicasState?.map((musica) => (
                  <tr key={musica.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{musica.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200 break-words">{musica.titulo}</td>
                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                      {new Intl.NumberFormat("pt-BR").format(musica.visualizacoes)}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                      <img
                        src={musica.thumb}
                        alt={`Thumb of ${musica.titulo}`}
                        className="w-12 h-12 object-cover border border-gray-300 dark:border-gray-700 rounded-3xl"
                      />
                    </td>

                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${musica.status === "Aprovada" ? "bg-green-100 text-green-800" :
                          musica.status === "Reprovada" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {musica.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(musica.id)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Aprovar
                        </button>

                        <button
                          onClick={() => handleDisapproval(musica.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Reprovar
                        </button>
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
