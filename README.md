# Triple Buzzer

A Jeopardy! game that compares AI responses from multiple models. Give it an answer, and three different AI models will respond with questions.

**Live demo:** <https://triple-buzzer.netlify.app>

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/triple-buzzer)

## Features

- Compare responses from OpenAI, Anthropic (Claude), and Google Gemini
- Select different models for each backend
- Random example questions button (🎲) for quick testing
- See response times for each AI
- Dynamic model fetching from Netlify AI Gateway
- Netlify serverless and edge functions

## Setup

1. Clone this repo
2. Deploy to Netlify or run locally with `netlify dev`

If running locally, make sure to update your Netlify CLI (e.g., `npm i -g netlify-cli@latest`)

If you're not using the Netlify CLI or deploying to Netlify, or if you're not using an up-to-date credits-based Netlify plan, you'll need to set the following environment variables:
 - `OPENAI_API_KEY`
 - `ANTHROPIC_API_KEY`
 - `GEMINI_API_KEY`

## API Endpoints

- `/api/openai` - OpenAI serverless function
- `/api/anthropic` - Anthropic serverless function
- `/api/gemini` - Google Gemini serverless function
- `/api/ai-models` - Edge function for fetching available models

Built with Netlify Functions and vanilla HTML/CSS/JS.
