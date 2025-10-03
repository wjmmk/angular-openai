import { OrthographyResponse } from "app/Interfaces";
import { environment } from "environments/environment.development";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/orthography`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('Error en la solicitud al intentar la corrección.');

    const data = await resp.json() as OrthographyResponse;
    return {
      ok: true,
      userScore: data.userScore,
      message: data.message,
    };

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
