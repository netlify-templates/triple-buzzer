# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Name
Triple Buzzer - A Jeopardy!-style AI game

## Commands

### Development
- **Install dependencies**: `npm install`
- **Run dev server**: `npm run dev` - Starts Vite dev server (default: http://localhost:5173)
- **Run with Netlify**: `netlify dev` - Starts local development server with serverless functions and edge functions
- **Type checking**: `npx tsc --noEmit` - Check TypeScript errors without emitting files
- **Lint**: `npm run lint` - Run ESLint on all TypeScript files
- **Update Netlify CLI**: `npm i -g netlify-cli@latest` (required for latest features)

### Build & Deployment
- **Build**: `npm run build` - Type check and build for production (outputs to `dist/`)
- **Preview build**: `npm run preview` - Preview production build locally
- Deploy to Netlify via Git push or Netlify CLI
- Live demo: https://triple-buzzer.netlify.app

## Architecture

### Application Type
A Jeopardy!-style game that compares AI responses from three different models. Users provide an answer, and three AI models respond with questions in parallel.

### Technology Stack
- **Frontend**: React 19.1.1 + TypeScript 5.9.2
- **Build Tool**: Vite 7.1.7 with SWC plugin for fast compilation
- **Linting**: ESLint 9.36.0 with flat config, TypeScript and React Hooks support
- **Backend**: Netlify serverless functions and edge functions (TypeScript)
- **AI SDKs**:
  - OpenAI SDK (`openai`) - Uses new response API with reasoning minimization
  - Anthropic SDK (`@anthropic-ai/sdk`) - Limited to 16 max tokens for concise responses
  - Google Gemini SDK (`@google/genai`) - Includes thinking budget optimization

### Project Structure
```
/
├── src/
│   ├── components/       # React components
│   │   ├── ChatHeader.tsx
│   │   ├── ChatMessages.tsx
│   │   ├── Message.tsx
│   │   ├── ProviderSelector.tsx
│   │   ├── ChatInput.tsx
│   │   └── TypingIndicator.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useModels.ts
│   │   └── useChat.ts
│   ├── data/            # Data and constants
│   │   └── exampleQuestions.ts
│   ├── styles/          # CSS files
│   │   └── App.css
│   ├── types.ts         # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # React entry point
│   └── vite-env.d.ts    # Vite type declarations
├── netlify/
│   ├── functions/       # Serverless functions
│   └── edge-functions/  # Edge functions
├── index.html           # Vite entry HTML
├── vite.config.js       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint flat config
└── netlify.toml         # Netlify build configuration
```

### Functions Structure

#### Serverless Functions (`netlify/functions/`)
- `openai.ts` - OpenAI endpoint with reasoning minimization for supported models
- `anthropic.ts` - Anthropic endpoint with strict token limits
- `gemini.ts` - Gemini endpoint with thinking budget optimization
- `common.ts` - Shared utilities including:
  - `SYSTEM_PROMPT`: Standardized Jeopardy contestant prompt
  - `validate()`: Unified API key and request body validation

#### Edge Functions (`netlify/edge-functions/`)
- `ai-models.ts` - Fetches available models from Netlify AI Gateway API
  - Path: `/api/ai-models`
  - Returns model lists by provider (openai, anthropic, gemini)

### API Endpoints
All function endpoints are prefixed with `/api`:
- `/api/openai` - OpenAI function
- `/api/anthropic` - Anthropic function
- `/api/gemini` - Gemini function
- `/api/ai-models` - Model listing edge function

### Request/Response Format
All AI endpoints require:
- Method: POST
- Body: `{ message: string, model: string }` (both fields required)
- Response: `{ answer: string, details?: object }`

### Environment Variables
Automatically set when using Netlify's AI Gateway on credit-based plans. Otherwise, manually set:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`

### Frontend Features
React single-page application with:
- **Component-based architecture**: Modular, reusable React components
- **Custom hooks**: `useModels` for fetching AI models, `useChat` for message handling
- **Type safety**: Full TypeScript coverage with strict mode enabled
- **Dynamic model selection**: Fetches available models from `/api/ai-models` on load
- **Provider selection**: Toggle and configure OpenAI, Anthropic, and Gemini
- **Random examples**: 30 sample questions accessible via 🎲 button
- **Parallel requests**: Sends to all selected providers simultaneously
- **Response timing**: Displays response times in milliseconds
- **Provider badges**: Color-coded badges for each AI provider
- **Responsive design**: Mobile-friendly layout with breakpoints

### Model Selection Logic
- Default models: `gpt-5`, `claude-3-5-haiku-latest`, `gemini-2.5-flash`
- Models fetched dynamically from Netlify AI Gateway
- All three providers enabled by default
- User can toggle providers and select models per provider
- Model selections persisted in component state

### TypeScript Configuration
- Uses `@tsconfig/vite-react` as base configuration
- Strict mode enabled for maximum type safety
- `skipLibCheck: true` for faster compilation
- Includes `src/` directory only
- Type declarations for CSS modules in `vite-env.d.ts`

### Linting Configuration
- ESLint 9 with flat config format (`eslint.config.js`)
- TypeScript ESLint plugin for TypeScript-specific rules
- React Hooks plugin for hooks best practices
- React Refresh plugin for Vite fast refresh compatibility
- Targets all `.ts` and `.tsx` files
- Ignores `dist/` build output