# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Name
Triple Buzzer - A Jeopardy!-style AI game

## Commands

### Development
- **Run locally**: `netlify dev` - Starts local development server with serverless functions and edge functions
- **Install dependencies**: `npm install`
- **Update Netlify CLI**: `npm i -g netlify-cli@latest` (required for latest features)

### Deployment
- Deploy to Netlify via Git push or Netlify CLI
- Live demo: https://triple-buzzer.netlify.app

## Architecture

### Application Type
A Jeopardy!-style game that compares AI responses from three different models. Users provide an answer, and three AI models respond with questions in parallel.

### Technology Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript in `index.html`
- **Backend**: Netlify serverless functions and edge functions (TypeScript)
- **AI SDKs**:
  - OpenAI SDK (`openai`) - Uses new response API with reasoning minimization
  - Anthropic SDK (`@anthropic-ai/sdk`) - Limited to 16 max tokens for concise responses
  - Google Gemini SDK (`@google/genai`) - Includes thinking budget optimization

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
The single-page application (`index.html`):
- Dynamically fetches available models from `/api/ai-models`
- Allows backend and model selection for each provider
- Random example button (🎲) to populate input with sample questions
- Sends parallel requests to selected models
- Displays response times in milliseconds
- Shows provider-specific badges with color coding
- Includes responsive design for mobile devices

### Model Selection Logic
- Fetches models dynamically on page load
- Intelligently selects defaults when available (gpt-5-mini, claude-3-5-haiku-latest, gemini-2.5-flash)
- Falls back to first available model if preferred defaults aren't found
- Shows loading/error states appropriately