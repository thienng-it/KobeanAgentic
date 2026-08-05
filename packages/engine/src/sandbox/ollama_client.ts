/**
 * Dynamic Per-User Local Ollama Auto-Discovery Client
 * Automatically detects installed models on user's Mac/PC (http://localhost:11434)
 */

export async function getInstalledLocalModels(): Promise<string[]> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    if (!res.ok) return [];
    const data: any = await res.json();
    return (data.models || []).map((m: any) => m.name || m.model);
  } catch (err) {
    return [];
  }
}

export async function queryLocalOllama(requestedModel: string, prompt: string): Promise<{ success: boolean; modelUsed: string; response: string; error?: string }> {
  // Step 1: Auto-discover installed local models on user's machine
  const availableModels = await getInstalledLocalModels();
  
  if (availableModels.length === 0) {
    return {
      success: false,
      modelUsed: 'none',
      response: '',
      error: `Ollama is offline on http://localhost:11434. Run 'ollama serve' or open Ollama app.`
    };
  }

  // Step 2: Pick best matching user model or fallback to first available
  const cleanRequested = requestedModel.replace('ollama/', '');
  let targetModel = availableModels.find((m) => m === cleanRequested || m.includes(cleanRequested)) || availableModels[0];

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: targetModel,
        prompt,
        stream: false
      })
    });

    if (!res.ok) {
      return {
        success: false,
        modelUsed: targetModel,
        response: '',
        error: `Ollama HTTP ${res.status}: ${res.statusText}`
      };
    }

    const data: any = await res.json();
    return {
      success: true,
      modelUsed: targetModel,
      response: data.response || ''
    };
  } catch (err: any) {
    return {
      success: false,
      modelUsed: targetModel,
      response: '',
      error: `Local Ollama error: ${err.message}`
    };
  }
}
