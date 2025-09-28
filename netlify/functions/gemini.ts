import {
  GoogleGenAI,
  GenerateContentParameters,
  GenerateContentConfig,
} from "@google/genai";
import { SYSTEM_PROMPT, validate } from "./common";

export default async function (req: Request) {
  const validatedRequest = await validate("GEMINI_API_KEY", req);
  if (validatedRequest.error) return validatedRequest.error;
  const { message, model } = validatedRequest;

  const params: GenerateContentParameters = {
    model,
    contents: message,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  };
  minimizeThinking(model, params.config!);

  console.log("Making Gemini request:", params);
  const genAI = new GoogleGenAI({});
  const response = await genAI.models.generateContent(params);

  return Response.json({
    answer: response.text,
    details: { thinking: params.config?.thinkingConfig },
  });
}

export const config = {
  path: "/api/gemini",
};

function minimizeThinking(model: string, config: GenerateContentConfig) {
  const GEMINI_PRO_MIN_THINKING = 128;

  const supportsThinking =
    (model.includes("2.5") || model.includes("latest")) &&
    !model.includes("image");

  if (supportsThinking) {
    const canDisable = !model.includes("pro");
    console.log(
      `minimizeThinking: ${model} supports thinking, canDisable: ${canDisable}`
    );
    config.thinkingConfig = {
      thinkingBudget: canDisable ? 0 : GEMINI_PRO_MIN_THINKING,
    };
  }
}
