import type { Config } from "@netlify/edge-functions";

export default async function () {
  try {
    // Fetch from Netlify AI Gateway API
    const response = await fetch('https://api.netlify.com/api/v1/ai-gateway/providers');
    if (!response.ok)
      throw new Error(`Failed to fetch providers: ${response.status}`);

    // Transform the data to extract model names per provider
    const modelsByProvider: Record<string, string[]> = {};

    const providers = (await response.json()).providers as Record<string, {models: string[]}>;
    Object.entries(providers).forEach(([providerName, provider]) => {
      if (['openai', 'anthropic', 'gemini'].includes(providerName)) {
        modelsByProvider[providerName] = provider.models;
      }
    });

    return Response.json(modelsByProvider);
  } catch (error) {
    console.error('Error fetching AI models:', error);
    return Response.json({});
  }
}

export const config: Config = {
  path: '/api/list-models'
};