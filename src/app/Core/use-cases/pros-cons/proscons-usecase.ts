import { OrthographyResponse } from "../../../Interfaces";
import { environment } from "../../../../environments/environment.development";

export const orthographyUseCaseProsCons = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/orthography-openai-pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('Error en la solicitud al intentar la corrección.');

    const data = await resp.text();

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return {
      ok: true,
      ...JSON.parse(data)
    }

    } catch (err) {
    console.error(err);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'NO se pudo procesar la solicitud',
    };
  }
}
