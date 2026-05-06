# Ray Portfolio

A personal website showcasing skills, services, and experience for lead generation.

## Features

- Responsive personal portfolio website
- AI-powered assistant (Frank) for visitor engagement
- Smart contact form with AI-assisted intake
- Portfolio Q&A capability
- Docker deployment ready

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

```bash
docker build -t ray-portfolio .
docker run -p 4000:4000 ray-portfolio
```

Or use docker-compose:

```bash
docker-compose up --build
```

The site will be available at [http://localhost:4000](http://localhost:4000).

## AI Assistant Setup

### OpenAI (Default)

1. Create a `.env.local` file (or rename `.env.example`):

```bash
cp .env.example .env.local
```

2. Add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai
NEXT_PUBLIC_ENABLE_AI=true
```

3. Restart the dev server.

### Local Model (Ollama)

For local development without API costs:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
NEXT_PUBLIC_ENABLE_AI=true
```

Make sure Ollama is running locally with the specified model.

## AI Features

### Frank - Site Assistant

The AI assistant (Frank) helps visitors:
- Understand Ray's services
- Find the right service for their needs
- Get quick answers to common questions
- Get guided toward contact

### Smart Intake Form

On the contact page, the form includes AI assistance:
- Writes a message describing your need
- Click "AI Assist" to get classification
- Review the AI summary before sending
- Edit or send directly

### Portfolio Q&A

On project detail pages, visitors can:
- Ask questions about specific projects
- Get contextual answers from project data
- Get suggestions for follow-up questions

## Project Structure

```
app/                    # Next.js app router pages
  layout.tsx            # Root layout with Header/Footer
  page.tsx              # Home page
  about/page.tsx        # About page
  services/page.tsx     # Services page
  skills/page.tsx       # Skills page
  projects/page.tsx     # Projects page
  contact/page.tsx      # Contact page
  api/ai/               # AI API routes
    chat/route.ts       # Chat endpoint
    intake/route.ts     # Intake classification
    portfolio/route.ts  # Portfolio Q&A

components/
  layout/               # Header, Footer
  sections/             # Page sections
  ui/                   # Button, Input, Card
  ai/                   # AI components
    AIAssistant.tsx     # Main assistant component
    AssistantLauncher.tsx
    AssistantPanel.tsx
    AssistantMessageList.tsx
    AssistantInput.tsx
    SmartIntakeForm.tsx
    PortfolioAskCard.tsx

lib/ai/                 # AI library
  provider.ts           # AI provider abstraction
  chat.ts               # Chat logic
  classify.ts           # Intake classification
  portfolio.ts          # Portfolio explanations
  guardrails.ts         # Input validation
  config.ts             # AI configuration
  types.ts              # TypeScript types

data/
  site/                 # Site knowledge
    profile.ts           # Ray's profile
    services.ts          # Service definitions
    portfolio.ts         # Project examples
    faq.ts              # FAQ data
  prompts/              # Prompt templates
    frank-system.md      # Assistant persona
    assistant-rules.md   # Operational rules
    intake-classifier.md # Contact classification
    portfolio-explainer.md # Project Q&A
```

## Customisation

### Content Files

Edit the content directly in each file:

- `app/page.tsx` - Home page content
- `app/about/page.tsx` - About content  
- `app/services/page.tsx` - Service descriptions
- `app/skills/page.tsx` - Skills list
- `app/projects/page.tsx` - Project examples
- `app/contact/page.tsx` - Contact details

### Site Data

Edit structured data files:

- `data/site/profile.ts` - Name, positioning, contact info
- `data/site/services.ts` - Service definitions with slugs, summaries, CTAs
- `data/site/portfolio.ts` - Project examples with challenges/solutions
- `data/site/faq.ts` - FAQ items the assistant can answer

### AI Prompts

Customize AI behavior in:

- `data/prompts/frank-system.md` - Assistant persona
- `data/prompts/assistant-rules.md` - Response rules
- `data/prompts/intake-classifier.md` - Contact classification logic
- `data/prompts/portfolio-explainer.md` - Project Q&A behavior

### Footer

Replace email, phone, and social links in `components/layout/Footer.tsx`.

## Privacy Note

When using the AI features, user messages are processed by an AI model (OpenAI or local). Messages are not stored permanently and are only used to generate responses.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API (or Ollama)
- Docker