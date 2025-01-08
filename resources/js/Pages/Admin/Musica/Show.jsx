import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from "react";
import { Head, Link } from "@inertiajs/react";

function Show({ musica }) {
    if (!musica) {
        return (
            <AuthenticatedLayout>
                <div className="py-12">
                    <h1>Carregando...</h1>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <Head title={` ${musica.titulo}`} />

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-4">{musica.titulo}</h1>

                            <div>
                                <img
                                    src={musica.thumb}
                                    alt={`Thumb of ${musica.titulo}`}
                                    className="w-full h-[500px] object-cover border border-gray-300 dark:border-gray-700 rounded-lg mt-2"
                                />
                            </div>

                            <div className="space-y-4 mt-6">
                                <div>
                                    <strong>ID:</strong> {musica.id}
                                </div>

                                <div>
                                    <strong>Visualizações:</strong>{" "}
                                    {new Intl.NumberFormat("pt-BR").format(musica.visualizacoes)}
                                </div>

                                <div>
                                    <strong>Link do Vídeo:</strong>{" "}
                                    <a
                                        key={musica.id}
                                        href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white-400 hover:underline"
                                    >
                                        Assistir no YouTube
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <div>
                                    <a
                                        href={route("admin.index")}
                                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Voltar
                                    </a>
                                </div>

                                <div>
                                    <Link
                                        href={route("admin.edit", { id: musica.id })}
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                    >
                                        Editar
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
