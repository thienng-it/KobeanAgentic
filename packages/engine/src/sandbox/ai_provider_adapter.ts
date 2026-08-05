import { queryLocalOllama } from './ollama_client.ts';

export interface AIProviderConfig {
  provider: 'local_ollama' | 'openai' | 'anthropic' | 'gemini' | 'deepseek';
  apiKey?: string;
  model: string;
}

export interface AIGenerateRequest {
  prompt: string;
  systemPrompt?: string;
  modelConfig?: AIProviderConfig;
}

export interface AIGenerateResponse {
  success: boolean;
  providerUsed: string;
  modelUsed: string;
  response: string;
  error?: string;
}

/**
 * Universal Multi-Provider AI Adapter
 * Supports Local Ollama, OpenAI (ChatGPT), Anthropic (Claude), Google (Gemini), and DeepSeek
 */
export async function queryAIProvider(req: AIGenerateRequest): Promise<AIGenerateResponse> {
  const envOpenAI = process.env.OPENAI_API_KEY;
  const envAnthropic = process.env.ANTHROPIC_API_KEY;
  const envGemini = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const envDeepSeek = process.env.DEEPSEEK_API_KEY;

  // 1. OpenAI / ChatGPT
  if (envOpenAI || req.modelConfig?.provider === 'openai') {
    const apiKey = envOpenAI || req.modelConfig?.apiKey;
    const model = req.modelConfig?.model || 'gpt-4o-mini';
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            ...(req.systemPrompt ? [{ role: 'system', content: req.systemPrompt }] : []),
            { role: 'user', content: req.prompt }
          ]
        })
      });
      if (res.ok) {
        const data: any = await res.json();
        return {
          success: true,
          providerUsed: 'OpenAI (ChatGPT)',
          modelUsed: model,
          response: data.choices?.[0]?.message?.content || ''
        };
      }
    } catch (e: any) {
      console.warn(`[OpenAI Warning] API call failed: ${e.message}`);
    }
  }

  // 2. Anthropic / Claude
  if (envAnthropic || req.modelConfig?.provider === 'anthropic') {
    const apiKey = envAnthropic || req.modelConfig?.apiKey;
    const model = req.modelConfig?.model || 'claude-3-5-sonnet-20241022';
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          max_tokens: 4096,
          messages: [{ role: 'user', content: req.prompt }]
        })
      });
      if (res.ok) {
        const data: any = await res.json();
        return {
          success: true,
          providerUsed: 'Anthropic (Claude)',
          modelUsed: model,
          response: data.content?.[0]?.text || ''
        };
      }
    } catch (e: any) {
      console.warn(`[Anthropic Warning] API call failed: ${e.message}`);
    }
  }

  // 3. Google Gemini
  if (envGemini || req.modelConfig?.provider === 'gemini') {
    const apiKey = envGemini || req.modelConfig?.apiKey;
    const model = req.modelConfig?.model || 'gemini-1.5-flash';
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.prompt }] }]
        })
      });
      if (res.ok) {
        const data: any = await res.json();
        return {
          success: true,
          providerUsed: 'Google (Gemini)',
          modelUsed: model,
          response: data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        };
      }
    } catch (e: any) {
      console.warn(`[Gemini Warning] API call failed: ${e.message}`);
    }
  }

  // 4. Default Fallback: Local Ollama Auto-Discovery
  const localRes = await queryLocalOllama(req.modelConfig?.model || 'auto', req.prompt);
  return {
    success: localRes.success,
    providerUsed: 'Local Ollama',
    modelUsed: localRes.modelUsed,
    response: localRes.response,
    error: localRes.error
  };
}
