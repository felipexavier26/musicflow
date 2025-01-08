import AuthenticatedLayout from '@/Layout/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {


    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="text-lg font-semibold">Você está logado!</p>
                            <p className="mt-2 text-base">Agora, você pode assistir vídeos diretamente no YouTube e sugerir novos vídeos utilizando o link do YouTube.</p>

                            <div className="mt-6">
                                <p className="text-sm">Para sugerir um vídeo, cole o link do YouTube no formulário acima.</p>
                            </div>

                            <div className="mt-4">
                                <a
                                    href={route('musicas.index')}
                                    active={route().current('musicas.index')}
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Sugerir Vídeo
                                </a>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm">
                                    Quer ver mais vídeos? Acesse diretamente o YouTube:
                                    <a
                                        href="https://www.youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline ml-1"
                                    >
                                        YouTube
                                    </a>
                                </p>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <span role="img" aria-label="video-icon" className="text-4xl text-yellow-500">🎥</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
