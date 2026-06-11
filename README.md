# 🌍 OrlaConnect

Repositório geral do **OrlaConnect**, composto por:

- **Front-end** em React + TypeScript
- **Back-end** em ASP.NET Core

## 📦 Estrutura do Repositório

```text
OrlaConnect/
├── orla-conecta-front/      # Aplicação web (cliente)
└── orla-conecta-backend/    # API e regras de negócio
```

## 🔗 READMEs Específicos

- Front-end: `/orla-conecta-front/README.md`
- Back-end: `/orla-conecta-backend/README.md`

## 🚀 Tecnologias Principais

### Front-end
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Bootstrap
- Axios

### Back-end
- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core
- SQL Server
- JWT
- Swagger

## ⚙️ Como Rodar o Projeto

### 1) Front-end

```bash
cd /home/runner/work/OrlaConnect/OrlaConnect/victorhpmelo/OrlaConnect/orla-conecta-front
npm install
npm run dev
```

Comandos úteis:

```bash
npm run lint
npm run build
```

### 2) Back-end

```bash
cd /home/runner/work/OrlaConnect/OrlaConnect/victorhpmelo/OrlaConnect/orla-conecta-backend
dotnet restore
dotnet build
dotnet test
```

## 🔐 Integração e Autenticação

- O front-end consome a API REST do back-end.
- A autenticação é baseada em **JWT**.

## 📚 Documentação Complementar

Além dos READMEs principais, existem documentos adicionais dentro de:

- `/orla-conecta-backend/docker/`
- `/orla-conecta-backend/orla-conecta-backend/docs/`
