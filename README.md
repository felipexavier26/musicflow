# Sistema de Gerenciamento de Músicas

Este projeto é um sistema para gerenciamento e compartilhamento de links de músicas, desenvolvido com Laravel para o backend e ReactJS para o frontend. Ele utiliza uma API REST para comunicação entre as aplicações e inclui autenticação, autorização, e funcionalidades de administração para gerenciamento de sugestões de músicas. O layout foi modernizado para oferecer uma experiência intuitiva e responsiva.

---

## Tecnologias Utilizadas

- **Laravel**: Framework PHP para construção do backend e da API RESTful.
- **MySQL**: Banco de dados para armazenamento de informações.
- **React**: Biblioteca JavaScript para a criação de uma interface de usuário dinâmica.
- **Inertia.js**: Permite integração perfeita entre Laravel e React para a criação de SPAs.
- **Tailwind CSS**: Framework CSS para o design responsivo e estilizado da interface.
- **SweetAlert2**: Biblioteca JavaScript para exibir alertas e notificações modais elegantes.

---

## Funcionalidades Principais

### Backend
- **API RESTful**:
  - Endpoint de retorno da api:
    ```json
    {
         "id": 4,
                "titulo": "Tristeza do jeca",
                "visualizacoes": 245879,
                "youtube_id": "tRQ2PWlCcZk",
                "thumb": "https://img.youtube.com/vi/tRQ2PWlCcZk/hqdefault.jpg",
                "created_at": "2025-01-08T03:14:02.000000Z",
                "updated_at": "2025-01-08T03:14:02.000000Z",
                "url": null,
                "status": "Pendente"
    }
    ```
  - Suporte a operações CRUD (criação, leitura, atualização e exclusão) de musicas.
- **Autenticação**:  - Implementada com Laravel Breeze para registro, login e logout.

### Frontend
- **CRUD de Músicas**:  - Funcionalidades para listar, adicionar, editar e excluir músicas, acessíveis apenas para administradores.
- **Paginação**:  - Componente de paginação para exibir a lista de músicas a partir da 6ª posição..
- **Interface Responsiva**:  - Desenvolvida com ReactJS e estilizada com Tailwind CSS, garantindo uma experiência moderna e adaptada a dispositivos móveis..
- **Status da Música**:  - Gerenciamento de status (Aprovado, Reprovado, Pendente) para sugestões de músicas, exibido em tempo real..
- **Alertas e Validação**:  - Mensagens claras de sucesso e erro para feedback ao usuário ao realizar ações como sugerir, aprovar/reprovar ou editar músicas..

---


## Configuração do Banco de Dados
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=

## Instruções de Instalação e Execução

### Requisitos
- **PHP**: >= 8.0
- **Composer**: Para gerenciar as dependências do Laravel.
- **Node.js e npm**: Para o frontend React.
- **MySQL**: Banco de dados configurado e acessível.

### Passos
1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/felipexavier26/musicflow.git
   cd musicflow

2. **Configuração do Backend**:
   ```bash

   - Instale as dependências do Laravel
   composer install

   - Copie o arquivo de exemplo de configuração
   cp .env.example .env


3. **Execute as migrações e seeders**:
   ```bash
    php artisan migrate --seed

4. **Geração de Chave da Aplicação**:
   ```bash
    php artisan key:generate


5. **Configuração do Frontend**:
    ```bash
    - Instale as dependências do npm:
        npm install
    
    - Compile os arquivos do frontend
        npm run dev


6. **Inicie o Servidor de Desenvolviment**:
    ```bash
    php artisan serve

7. **Inicie o Servidor de Desenvolviment**:
    ```bash
    Abra o navegador em http://127.0.0.1:8000.




![image](https://github.com/user-attachments/assets/1f0c1680-194a-411b-bd08-8397141ccdeb)

![image](https://github.com/user-attachments/assets/4e242082-d858-4877-ab7f-a5c695741b13)

![image](https://github.com/user-attachments/assets/3d65a9b3-0f83-47e9-a420-ebee6dc54041)

![image](https://github.com/user-attachments/assets/0980342d-a2f8-4bb4-9291-85e9fffd9258)



