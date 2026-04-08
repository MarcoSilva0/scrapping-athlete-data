# Scrapping Athlete Data

Projeto dividido em dois subprojetos:

## 📁 Estrutura

```
.
├── backend/   # NestJS – API de scraping
└── frontend/  # Next.js – Interface web
```

---

## Backend (NestJS)

Expõe um endpoint REST que utiliza **Puppeteer** para buscar resultados de atletismo/triathlon no Google.

### Instalação

```bash
cd backend
npm install
```

### Executar em desenvolvimento

```bash
npm run start:dev
```

O servidor sobe em `http://localhost:3001`.

### Endpoint

```
GET /scraper?name=<nome do atleta>
```

**Resposta:**

```json
[
  { "title": "Nome do link", "url": "https://..." },
  ...
]
```

### Variáveis de ambiente

| Variável       | Padrão                   | Descrição                              |
|----------------|--------------------------|----------------------------------------|
| `PORT`         | `3001`                   | Porta do servidor                      |
| `FRONTEND_URL` | `http://localhost:3000`  | URL permitida pelo CORS                |

---

## Frontend (Next.js)

Interface simples para pesquisar atletas e exibir os resultados retornados pelo backend.

### Instalação

```bash
cd frontend
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Variáveis de ambiente

| Variável                  | Padrão                   | Descrição              |
|---------------------------|--------------------------|------------------------|
| `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:3001`  | URL do backend NestJS  |

---

## Rodando os dois juntos

```bash
# Terminal 1
cd backend && npm install && npm run start:dev

# Terminal 2
cd frontend && npm install && npm run dev
```

Acesse `http://localhost:3000`, digite o nome de um atleta e clique em **Buscar**.