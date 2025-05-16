# 🛒 Projeto Ecommerce - NestJS (Backend) + Vite (Frontend)

Este repositório contém uma aplicação full stack de ecommerce, utilizando:

- **Backend**: [NestJS](https://nestjs.com/)
- **Frontend**: [Vite](https://vitejs.dev/) com [React](https://react.dev/)

## 📁 Estrutura do Projeto

.
├── backend/            # API NestJS
├── frontend/           # Aplicação Vite + React
└── docker-compose.yml  # Orquestração com Docker


## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (opcional, para execução via containers)


## 👟 Execução Manual

### 1. Backend (NestJS)

```bash
cd backend
yarn install            
yarn start:dev 
```

A API estará disponível em: `http://localhost:3000/api`

> ⚠️ Certifique-se de que o backend esteja configurado para conectar com o MongoDB no endereço correto (ex: via `.env`)

### 2. Frontend (Vite)

```bash
cd frontend
yarn install          
yarn dev                
```

A aplicação estará disponível em: `http://localhost:5173/`

> ⚠️ Certifique-se de que o frontend esteja configurado para consumir a API no endereço correto (ex: via `.env`)

---

## 🐳 Execução via Docker

### 1. Build e subida dos containers

```bash
docker-compose up --build
```

### 2. Acesso

- Frontend: [http://localhost:5173/](http://localhost:5173/)
- Backend: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🔧 Tecnologias Utilizadas

### Backend

- NestJS
- MongoDB
- Swagger 

### Frontend

- Vite
- React
- Axios (para consumo da API)
- TailwindCSS para estilo

---

## 🧩 Melhorias Futuras

- [ ] **Refresh tokens**
- [ ] **Testes unitários**
- [ ] **Integração com CI/CD (GitHub Actions, GitLab CI, etc)**
- [ ] **Integração com serviços externos (ex: pagamentos, envio de e-mail, etc)**
- [ ] **PWA Support para o frontend**
- [ ] **Separação de ambientes (dev/staging/prod)**
- [ ] **Vincular produto com vendedor**
- [ ] **Cadastro de produto completo, como img, categoria, cor, variação e etc**
- [ ] **Buscar personalizadas**
- [ ] **Relatórios**
- [ ] **Chat para suporte e conversa entre comprador e vendedor**

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
