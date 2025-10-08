import { environment } from "environments/environment.development";

export const prosConsStreamUseCase = async (prompt: string) => {
  try {
      const resp = await fetch(`${environment.backendAPI}/orthography-openai-pros-cons-discusser-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!resp.ok) throw new Error('Error en la solicitud al intentar la corrección.');

      /* const data = await resp.text();
      if (!data) { throw new Error('No se recibieron datos del servidor'); } */

      const reader = resp.body?.getReader(); // Permite ir leyendo la data conforme va llegando Chunk.
      if (!reader) throw new Error('No se pudo leer el data del servidor');

      const decoder = new TextDecoder('utf-8');
      let done = false;
      let finalText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        finalText += decoder.decode(value, { stream: !done });
        console.log({ finalText });
      }

      return {
        ok: true,
        ...JSON.parse(finalText)
      };
  } catch (err) {
    return null;
  }
}


export async function* prosConsStreamUseCaseGenerator(prompt: string, abortSignal: AbortSignal) {
  try {
      const resp = await fetch(`${environment.backendAPI}/orthography-openai-pros-cons-discusser-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal // AbortSignal.timeout(2 * 60 * 1000) // 2 minutos
      });

      if (!resp.ok) throw new Error('Error en la solicitud al intentar la corrección.');

      const reader = resp.body?.getReader();
      if (!reader) throw new Error('No se pudo leer el data del servidor');

      const decoder = new TextDecoder('utf-8');
      let done = false;
      let finalText = '';

      while (true) {
        const { value, done: doneReading } = await reader.read();
        if(done) break;

        const chunkValue = decoder.decode(value, { stream: !doneReading });
        finalText += chunkValue;
        yield chunkValue;
      }

    return finalText;
  } catch (err) {
    return null;
  }
}

