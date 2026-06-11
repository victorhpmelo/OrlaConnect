

# 🌐 OrlaConnect - Front-End do Sistema de Gerenciamento de Pacotes de Viagem

Este repositório contém o front-end do sistema **OrlaConnect**, desenvolvido com **React 19**, **TypeScript**, **Vite** e **Tailwind CSS**, com foco em performance, responsividade e integração com o back-end via **API REST**.

## 🚀 Tecnologias Utilizadas

- **React 19** (com JSX e Hooks)
- **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS** (compatível com PostCSS 7)
- **Bootstrap 5** + **Bootstrap Icons**
- **React Router DOM v7**
- **Axios** (requisições HTTP)
- **JWT Decode** (decodificação de tokens)
- **React Input Mask** (máscaras de input)
- **Font Awesome** e **React Icons**

## 📁 Estrutura de Pastas (sugestão)

```
/OrlaConnectfrontend
│
├── src/
│   ├── assets/              # Imagens e arquivos estáticos
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/               # Páginas principais (Home, Login, Pacotes, etc.)
│   ├── services/            # Serviços de API (axios)
│   ├── types/               # Types customizados
│   ├── contexts/            # Contextos globais (ex: autenticação)
│   ├── routes/              # Definição de rotas
│   ├── utils/               # Funções utilitárias
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│
├── public/                  # Arquivos públicos
├── index.html               # HTML base
├── tailwind.config.js       # Configuração do Tailwind
├── tsconfig.json            # Configuração do TypeScript
├── vite.config.ts           # Configuração do Vite
```

## ⚙️ Como Executar Localmente

### ✅ Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### 📦 Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio-frontend.git
cd OrlaConnectfrontend
npm install
```

### ▶️ Rodar em modo desenvolvimento

```bash
npm run dev
```

Acesse no navegador: http://localhost:5173

### 🛠️ Build para produção

```bash
npm run build
```

### 🔍 Visualizar build

```bash
npm run preview
```

### 🧪 Rodar Lint

```bash
npm run lint
```

## 🔐 Autenticação

O front-end utiliza **JWT** para autenticação. O token é armazenado localmente e decodificado com `jwt-decode` para controle de sessão e permissões.

## 🌍 Integração com APIs

As requisições são feitas via `axios` para os endpoints do back-end ASP.NET Core. Os serviços estão organizados na pasta `src/services`.

---
