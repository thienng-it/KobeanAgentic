/**
 * Real Local Ollama HTTP Client Adapter (http://localhost:11434)
 */
export async function queryLocalOllama(model: string, prompt: string): Promise<{ success: boolean; response: string; error?: string }> {
  const modelName = model.replace('ollama/', '');

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelName,
        prompt,
        stream: false
      })
    });

    if (!res.ok) {
      return {
        success: false,
        response: '',
        error: `Ollama HTTP ${res.status}: ${res.statusText}`
      };
    }

    const data: any = await res.json();
    return {
      success: true,
      response: data.response || ''
    };
  } catch (err: any) {
    return {
      success: false,
      response: '',
      error: `Ollama is not running on http://localhost:11434 (${err.message}). Run 'ollama run llama3' to start local AI.`
    };
  }
}
