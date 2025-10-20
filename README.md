# Painel de Gerenciamento de Eventos - Plataforma de Ingressos

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Um painel de administração completo para uma plataforma de venda de ingressos, construído do zero com React. Este projeto simula um ambiente de back-office onde é possível gerenciar todos os aspectos de um sistema de eventos, desde o cadastro de clientes até a criação de lotes de ingressos e uma simulação de checkout com PIX.

## ✨ Funcionalidades

-   **Autenticação:** Tela de login funcional (simulada no frontend).
-   **Dashboard Central:** Um painel com acesso rápido a todas as funcionalidades do sistema.
-   **Gerenciamento CRUD Completo:**
    -   [x] **Clientes:** Cadastro de novos clientes.
    -   [x] **Eventos:** Criação, visualização, edição e exclusão de eventos.
    -   [x] **Cupons:** Gerenciamento de cupons de desconto com validação por quantidade ou data.
    -   [x] **Setores:** Criação de setores para os eventos (ex: Pista, Camarote) com controle de capacidade.
    -   [x] **Lotes:** Gerenciamento de lotes de ingressos, associados a eventos e setores, com preço e quantidade.
-   **Vitrine do Evento:** Página pública para o cliente final visualizar detalhes do evento e selecionar ingressos.
-   **Carrinho de Compras:** Funcionalidade de carrinho de compras em tempo real na página do evento.
-   **Checkout Simulado com PIX:** Tela de pagamento que exibe um QR Code e código "copia e cola" de exemplo, com simulação de confirmação de pagamento.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

-   **React.js:** Biblioteca principal para a construção da interface de usuário.
-   **JavaScript (ES6+):** Linguagem base com recursos modernos.
-   **CSS Moderno:** Estilização feita com Flexbox, Grid Layout e animações para uma interface fluida.
-   **Vite:** Ferramenta de build para um ambiente de desenvolvimento rápido.

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local.

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  **Navegue até a pasta do projeto**
    ```bash
    cd nome-da-pasta
    ```
3.  **Instale as dependências**
    ```bash
    npm install
    ```
4.  **Execute a aplicação**
    ```bash
    npm run dev
    ```
5.  **Acesse o Painel de Admin**<br>
    Após a aplicação iniciar, use as seguintes credenciais de teste na tela de login para acessar o painel de gerenciamento:

    > **E-mail:** `teste@paggue.io`
    > **Senha:** `teste123`

## 👨‍💻 Autor

- **Nome:** Wrivan Markus Prado de Oliveira
- **Email:** [markuspradoalpha@gmail.com](mailto:markuspradoalpha@gmail.com)
- **LinkedIn:** [Wrivan Markus Prado](https://www.linkedin.com/in/wrivan-markus-prado-9a9047237/)
- **GitHub:** [Mark1762](https://github.com/Mark1762)
