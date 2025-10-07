import { OrthographyResponse } from "../../../Interfaces";
import { environment } from "../../../../environments/environment.development";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/orthography-openai-pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('Respuesta del backend: ', resp);

    if (!resp.ok) throw new Error('Error en la solicitud al intentar la corrección.');

    const data = await resp.text();

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    console.log('Datos recibidos del servidor:', data);

    try {
      // Intentar parsear como JSON primero
      const jsonData = JSON.parse(data);
      return {
        ok: true,
        userScore: typeof jsonData.userScore === 'number' ? jsonData.userScore : 0,
        message: jsonData.message || data,
        errors: Array.isArray(jsonData.errors) ? jsonData.errors : []
      };
    } catch (e) {
      // Si no es JSON, usar el texto como mensaje
      return {
        ok: true,
        userScore: 0,
        message: data,
        errors: []
      };
    }  } catch (err) {
    console.error(err);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'NO se pudo procesar la solicitud',
    };
  }
}
