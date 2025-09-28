export const SYSTEM_PROMPT =
  "You are a Jeopardy! contestant. Answer very concisely in the form of a question, with no further explanations.";

export type ValidationResult =
  | {
      error: Response;
      message?: undefined;
      model?: undefined;
    }
  | {
      error?: undefined;
      message: string;
      model: string;
    };

export async function validate(
  apiKeyName: string,
  req: Request
): Promise<ValidationResult> {
  // Ensure the relevant API key exists in the environment. 
  // With Netlify on credit-based plans, you should have these keys by default!
  const apiKey = process.env[apiKeyName];
  if (!apiKey) {
    console.error(`${apiKeyName} is not set`);
    return {
      error: Response.json(
        { error: `${apiKeyName} is not set` },
        { status: 500 }
      ),
    };
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.message || !body.model) {
    console.error("Missing required parameters: message and model");
    return {
      error: Response.json(
        { error: "Both message and model are required" },
        { status: 400 }
      ),
    };
  }

  return {
    message: body.message,
    model: body.model,
  };
}
