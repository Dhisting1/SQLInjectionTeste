# SQL Injection Teste

Este projeto é uma aplicação de demonstração de vulnerabilidades de SQL Injection, construída com **Node.js, PostgreSQL e React**, com Docker para facilitar a execução.

O objetivo é mostrar como consultas SQL inseguras podem ser exploradas e como corrigi-las usando **queries parametrizadas**.

---

## Tecnologias utilizadas

- **Backend:** Node.js + Express + TypeScript  
- **Banco de dados:** PostgreSQL  
- **Frontend:** React + TypeScript + Vite  
- **Docker & Docker Compose:** Para containerização de todos os serviços  
- **CORS:** Para permitir requisições entre frontend e backend  
- **pg (node-postgres):** Conexão com PostgreSQL  

---

## Estrutura do projeto

```
SQLInjectionTeste/
├─ backend/
│  ├─ server.ts         # Servidor Express + conexão com PostgreSQL
│  ├─ package.json      # Dependências do backend
│  └─ tsconfig.json
├─ frontend/
│  ├─ src/
│  │  └─ App.tsx       # Componente principal React
│  ├─ package.json      # Dependências do frontend
│  └─ tsconfig.json
├─ docker-compose.yml   # Orquestração dos containers
└─ README.md
```

---

## Funcionalidades

- Backend com rota vulnerável de login (`/login`) para demonstração de SQL Injection.
- Backend seguro usando **queries parametrizadas** (comentado no `server.ts`).
- Frontend React simples com formulário de login.
- Comunicação via Docker, sem necessidade de instalar Node ou PostgreSQL localmente.
- Persistência dos dados PostgreSQL usando **volumes Docker**.

---

## Como inicializar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Passo a passo

1. Clone o repositório:

```bash
git clone <https://github.com/Dhisting1/SQLInjectionTeste.git>
cd SQLInjectionTeste
```

2. Suba os containers com Docker Compose:

```bash
docker compose up --build
```

Isso irá:

- Criar e rodar o container PostgreSQL (`app_db`), com usuário `postgres` e senha `password`.
- Construir e rodar o backend em **http://localhost:3001**.
- Construir e rodar o frontend em **http://localhost:3000**.

3. Acesse o frontend:

Abra no navegador: [http://localhost:3000](http://localhost:3000)

4. Teste a vulnerabilidade:

No formulário de login ou via Postman, tente enviar:

```json
{
  "username": "' OR '1'='1",
  "password": "' OR '1'='1"
}
```

Isso demonstra como **SQL Injection** pode permitir acesso sem credenciais válidas.

5. Teste o login seguro:

Descomente a rota segura no `server.ts` usando **query parametrizada**, reinicie o backend e observe que o mesmo payload não funciona mais.

---

## Comandos úteis

- Parar containers:  
```bash
docker compose down
```

- Parar containers e remover volumes (limpeza completa do banco):  
```bash
docker compose down -v
```

- Entrar no container do backend:  
```bash
docker exec -it sqlinjectionteste-backend-1 sh
```

- Entrar no container do PostgreSQL:  
```bash
docker exec -it sqlinjectionteste-postgres-1 psql -U postgres -d app_db
```

---

## Observações

- O projeto foi feito apenas para **propósitos educacionais**.
- Nunca use esse tipo de consulta vulnerável em produção.
- A persistência do banco é garantida pelo **volume Docker `postgres_data`**.

---

Fernando - Desenvolvimento Web e Segurança de Aplicações

