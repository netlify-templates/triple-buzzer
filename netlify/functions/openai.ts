import OpenAI from "openai";
import type { ResponseCreateParams } from "openai/resources/responses/responses.mjs";
import { SYSTEM_PROMPT, validate } from "./utils/common";
import type { Config } from "@netlify/functions"


export default async function (req: Request) {
  const validatedRequest = await validate("OPENAI_API_KEY", req);
  if (validatedRequest.error) return validatedRequest.error;
  const { message, model } = validatedRequest;

  const params: ResponseCreateParams = {
    model,
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: message,
      },
    ],
  };
  minimizeReasoning(model, params);

  console.log("Making OpenAI request:", params);
  const client = new OpenAI();
  const response = await client.responses.create(params);
  
  return Response.json({
    answer: response.output_text,
    details: { reasoning: params.reasoning },
  });
}

export const config = {
  path: "/api/openai",
  rateLimit: {
    windowLimit: 5, // Max 5 requests per window
    windowSize: 60, // Window size in seconds (default: 60)
    aggregateBy: ["ip", "domain"],
  },
};

function minimizeReasoning(model: string, params: ResponseCreateParams) {
  const supportsReasoning = /gpt-5|codex|o3|o4/.test(model);
  if (supportsReasoning) {
    const canDisable = !/codex|o3|o4/.test(model);
    console.log(
      `minimizeReasoning: ${model} supports reasoning, canDisable: ${canDisable}`
    );
    params.reasoning = { effort: canDisable ? "minimal" : "low" };
  }
}
