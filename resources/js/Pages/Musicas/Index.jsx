import React, { useState, useEffect, useRef } from 'react';
import '../../../css/styles.css';
import AuthenticatedLayout from '@/Layout/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import tiao from '../../../../public/img/tiao-carreiro-pardinho.png';
import Swal from 'sweetalert2';

const formatarVisualizacoes = (visualizacoes) => {
  if (visualizacoes >= 1_000_000) {
    return (visualizacoes / 1_000_000).toFixed(1) + 'M';
  }
  if (visualizacoes >= 1000) {
    return (visualizacoes / 1000).toFixed(1) + 'K';
  }
  return visualizacoes;
};

function Index() {
  const [musicas, setMusicas] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const urlInput = useRef(null);

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/musicas?page=${currentPage}`);
      const data = await response.json();
      console.log(data);

      if (Array.isArray(data.musicas.data)) {
        setMusicas(data.musicas.data);
        setLastPage(data.musicas.last_page);
      } else {
        setMessage('Erro: dados da música estão em formato inesperado');
      }
    } catch (error) {
      setMessage('Erro ao carregar músicas');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMusicas();
  }, [currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = e.target.url.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/musicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Música sugerida com sucesso!');

        if (urlInput.current) {
          urlInput.current.value = '';
        }

        fetchMusicas();

        Swal.fire({
          icon: 'success',
          title: 'Música sugerida com sucesso!',
          text: 'A música foi adicionada à lista.',
        });
      } else {
        setMessage(result.message || 'Erro ao sugerir a música');
      }
    } catch (error) {
      setMessage('Erro ao sugerir a música');

      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Houve um problema ao sugerir a música. Tente novamente mais tarde.',
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <Head>
        <title>Top 5 Músicas Mais Tocadas - Tião Carreiro & Pardinho</title>
        <meta name="description" content="Ranking das músicas mais tocadas de Tião Carreiro & Pardinho" />
      </Head>

      <div className="container-music">
        <header className='header'>
          <img src={tiao} alt="Tião Carreiro" className="artist-img" />
          <h1>Top 5 Músicas Mais Tocadas</h1>
          <h2>Tião Carreiro & Pardinho</h2>
        </header>

        <div className="submit-form">
          <h3 className='text-gray-200 mt-6'>Sugerir Nova Música</h3>

          {message && (
            <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="url"
                name="url"
                placeholder="Cole aqui o link do YouTube"
                required
                ref={urlInput}
              />
              <button type="submit" className="submit-button">Enviar Link</button>
            </div>
          </form>
        </div>

        <h3 className=" text-gray-200	 mb-2">Ranking Atual</h3>

        {loading ? (
          <div>Carregando...</div>
        ) : musicas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎵</div>
            <div className="empty-state-text">Nenhuma música cadastrada ainda</div>
            <div className="empty-state-subtext">Seja o primeiro a sugerir uma música usando o formulário acima!</div>
          </div>
        ) : (
          musicas.map((musica, index) => {
            const ranking = (currentPage - 1) * 5 + index + 1;
            return (
              <a
                key={musica.id}
                href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="music-card-link"
              >
                <div className="music-card flex items-center">
                  <div className="rank">{ranking}</div>
                  <div className="text-gray-200 flex-grow">
                    <div className="music-title">{musica.titulo}</div>
                    <div className="views">{formatarVisualizacoes(musica.visualizacoes)} visualizações</div>
                  </div>
                  <div className="ml-auto">
                    <img src={musica.thumb} alt={`${musica.titulo}`} className="thumbnail" />
                  </div>
                </div>
              </a>
            );
          })
        )}

        <div className="pagination text-gray-200">
          {currentPage > 1 && (
            <button className="page-button" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
          )}

          <span className="page-info">
            Página {currentPage} de {lastPage}
          </span>

          {currentPage < lastPage && (
            <button className="page-button" onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
