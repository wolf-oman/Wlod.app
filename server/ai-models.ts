interface AIModelConfig {
  provider: "github-openai" | "github-mistral";
  model: string;
  endpoint: string;
}

export class AIModelsService {
  private githubToken: string | null = null;
  private endpoint = "https://models.github.ai/inference";

  constructor() {
    this.githubToken = process.env.GITHUB_TOKEN || null;
  }

  async generateWithGPT4(messages: Array<{role: "system" | "user", content: string}>): Promise<string> {
    if (!this.githubToken) {
      throw new Error("GITHUB_TOKEN not configured");
    }

    try {
      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content || "حدث خطأ في الاستجابة";
    } catch (error) {
      console.error("GPT-4 Error:", error);
      throw new Error("فشل في الاتصال بنموذج GPT-4");
    }
  }

  async generateWithMistral(messages: Array<{role: "system" | "user", content: string}>): Promise<string> {
    if (!this.githubToken) {
      throw new Error("GITHUB_TOKEN not configured");
    }

    try {
      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "Mistral-large",
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content || "حدث خطأ في الاستجابة";
    } catch (error) {
      console.error("Mistral Error:", error);
      throw new Error("فشل في الاتصال بنموذج Mistral");
    }
  }

  async generateCode(prompt: string, language: string, model: "gpt-4" | "mistral" = "mistral"): Promise<string> {
    const systemMessage = {
      role: "system" as const,
      content: `أنت مطور خبير متخصص في ${language}. قم بإنشاء كود عالي الجودة، نظيف، ومع تعليقات باللغة العربية. استخدم أفضل الممارسات والمعايير الحديثة.`
    };

    const userMessage = {
      role: "user" as const,
      content: `أنشئ كود ${language} للمتطلب التالي: ${prompt}`
    };

    if (model === "gpt-4") {
      return await this.generateWithGPT4([systemMessage, userMessage]);
    } else {
      return await this.generateWithMistral([systemMessage, userMessage]);
    }
  }

  async generateChatResponse(userMessage: string, model: "gpt-4" | "mistral" = "gpt-4"): Promise<string> {
    const systemMessage = {
      role: "system" as const,
      content: `أنت مساعد ذكي متطور من WolfOmanAI. تتحدث باللغة العربية وتساعد المطورين في البرمجة والتطوير. كن مفيداً ومبدعاً في إجاباتك. استخدم العبارات الشاعرية أحياناً مثل "كل سطر كود هو قطرة من روحك تتدفق في العالم الرقمي".`
    };

    const userMsg = {
      role: "user" as const,
      content: userMessage
    };

    if (model === "gpt-4") {
      return await this.generateWithGPT4([systemMessage, userMsg]);
    } else {
      return await this.generateWithMistral([systemMessage, userMsg]);
    }
  }

  isConfigured(): boolean {
    return this.githubToken !== null;
  }

  getAvailableModels(): string[] {
    if (!this.isConfigured()) return [];
    
    return [
      "gpt-4o",
      "gpt-4o-mini", 
      "mistral-ai/Codestral-2501"
    ];
  }
}

export const aiModelsService = new AIModelsService();