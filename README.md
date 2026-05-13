# Ray Portfolio

Conversion-focused personal website and admin platform for services, skills proof, AI-assisted intake, and governance-driven operations.

## What’s Included

- Next.js website (`/`, `/services`, `/skills`, `/projects`, `/contact`)
- Admin area (`/admin`) with:
  - Contact submissions inbox
  - Frank assistant configuration
  - Site settings (branding, links, theme, hero CTA)
  - Enterprise AI-agent platform workspace
  - Foundation & Governance roadmap + operational checklist + readiness scoring
- AI support:
  - OpenAI (default)
  - Ollama (local or Docker service)
- Docker stack with:
  - Traefik HTTPS gateway
  - PostgreSQL
  - Ollama on port `11535`
  - n8n (internal `8000`, routed via HTTPS)

---

## Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose plugin

---

## Install & Setup (Local Node)

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Edit `.env.local` at minimum:

```env
OPENAI_API_KEY=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
DATABASE_URL=postgresql://ray:ray_password@localhost:6432/ray_portfolio
```

4. Start app:

```bash
npm run dev
```

5. Open:

- `http://localhost:3000`

---

## Run with Docker (Production Compose)

Start full stack:

```bash
docker compose up --build
```

Access:

- Website (direct dev server): `http://localhost:4100`
- Website: `https://localhost`
- n8n: `https://n8n.localhost`
- Traefik dashboard: `http://localhost:8080`

Notes:

- HTTP is redirected to HTTPS by Traefik.
- TLS is local/self-signed; browser warnings are expected.
- Ollama is exposed on host at `http://localhost:11535`.

Stop:

```bash
docker compose down
```

---

## Run with Docker (Development / Live Reload)

Start dev stack:

```bash
npm run dev:docker
```

Access:

- Website: `https://localhost`
- n8n: `https://n8n.localhost`
- Traefik dashboard: `http://localhost:8080`
- PostgreSQL from host tooling: `localhost:6432`
- Ollama from host: `http://localhost:11535`

Stop:

```bash
npm run dev:docker:down
```

---

## Services in Compose

- `traefik`
  - Entry points: `:80`, `:443`
  - Redirects HTTP -> HTTPS
  - Docker provider enabled
- `web`
  - Next.js app
  - Routed by Traefik host rule `localhost`
- `postgres`
  - Internal DB host: `postgres:5432`
- `ollama`
  - Internal + host port: `11535`
  - Web container default: `OLLAMA_BASE_URL=http://ollama:11535`
- `n8n`
  - Internal port: `8000`
  - Routed by Traefik host rule `n8n.localhost`

---

## Environment Variables

See `.env.example` for full list.

Key variables:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `AI_PROVIDER` (`openai` or `ollama`)
- `OLLAMA_BASE_URL` (default Docker: `http://ollama:11535`)
- `OLLAMA_MODEL`
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_ROLE` (`owner | admin | operator | viewer`)

---

## Database

Apply migrations:

```bash
npm run db:migrate
```

Tables include:

- `contact_submissions`
- `frank_config`
- `enterprise_agent_platform_config`
- `site_settings`

---

## Admin Routes

- `/admin/login`
- `/admin`
- `/admin/contact-submissions`
- `/admin/frank`
- `/admin/settings`
- `/admin/ai-agent-platform`

Governance workspace includes:

- Foundation & Governance roadmap
- Operational checklist tracker
- Phase readiness scoring
- Expansion blocked/ready executive signal

---

## AI Modes

### OpenAI (default)

```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

### Ollama

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11535
OLLAMA_MODEL=llama3.1
```

For Docker web service, `OLLAMA_BASE_URL` defaults to `http://ollama:11535`.

---

## Validation Commands

```bash
npm run lint
npm run build
```

---

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- PostgreSQL + Drizzle ORM
- OpenAI / Ollama
- Traefik
- n8n
- Docker Compose
