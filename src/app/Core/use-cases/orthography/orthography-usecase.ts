import { OrthographyResponse } from "../../../Interfaces";
import { environment } from "../../../../environments/environment.development";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/orthography`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    // Manejo de errores de HTTP, fundamental
    if (!resp.ok) {
        // Intentamos obtener el error detallado del cuerpo si lo hay, si no, lanzamos error genérico.
        const errorText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errorText || 'Error en la solicitud al intentar la corrección.'}`);
    }

    const data = await resp.text();

    if (!data) {
       throw new Error('No se recibieron datos del servidor');
    }

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
