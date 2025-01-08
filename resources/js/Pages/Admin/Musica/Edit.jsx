import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';

function EditMusica({ musica, id }) {
  console.log('ID da música:', id);

  const [message, setMessage] = useState('');
  const urlInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = e.target.url.value;

    try {
      if (!id) {
        throw new Error('ID não encontrado');
      }

      const response = await fetch(`/api/musicas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url
        }),
      });

      const result = await response.json();

      console.log('Resultado da requisição ao salvar a música:', result);

      if (response.ok) {
        setMessage('Música atualizada com sucesso!');
        Swal.fire({
          icon: 'success',
          title: 'Música atualizada!',
          text: 'A música foi atualizada com sucesso.',
        }).then(() => {
          urlInput.current.value = '';
          window.location.href = '/admin/index';
        });
      } else {
        setMessage(result.message || 'Erro ao salvar a música');
      }
    } catch (error) {
      setMessage('Erro ao salvar a música');
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Houve um problema ao atualizar a música. Tente novamente mais tarde.',
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="py-12">
        <Head title={`Detalhes da Música - ${musica.titulo}`} />

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
                <div className="submit-form">
                  <h3 className='text-gray-200 mt-6 mb-2'>Editar URL da Música</h3>

                  {message && (
                    <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-4">
                      <input
                        type="url"
                        name="url"
                        placeholder="Cole aqui o link do YouTube"
                        required
                        ref={urlInput}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Atualizar Link
                      </button>
                    </div>


                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default EditMusica;
