import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { Mistral } from "@mistralai/mistralai";

const token = import.meta.env.VITE_GITHUB_TOKEN; // يفضل استخدام VITE_ للبيئة

export async function runDeepSeek(prompt: string): Promise<string> {
  const client = ModelClient("https://models.github.ai/inference", new AzureKeyCredential(token));
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: prompt }],
      model: "deepseek/DeepSeek-R1",
      max_tokens: 1000,
    }
  });
  if (isUnexpected(response)) throw response.body.error;
  return response.body.choices[0].message.content;
}

export async function runMistral(prompt: string): Promise<string> {
  const client = new Mistral({
    apiKey: token,
    serverURL: "https://models.github.ai/inference"
  });
  const response = await client.chat.complete({
    model: "mistral-ai/Codestral-2501",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 1.0,
    max_tokens: 1000,
    top_p: 1.0
  });
  return response.choices[0].message.content;
}

export async function runGrok(prompt: string): Promise<string> {
  const client = ModelClient("https://models.github.ai/inference", new AzureKeyCredential(token));
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: prompt }],
      model: "xai/grok-3",
      max_tokens: 1000,
    }
  });
  if (isUnexpected(response)) throw response.body.error;
  return response.body.choices[0].message.content;
}
