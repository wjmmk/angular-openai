import { Injectable } from "@angular/core";
import { orthographyUseCase } from "app/Core/use-cases/orthography/orthography-usecase";
import { prosConsStreamUseCase, prosConsStreamUseCaseGenerator } from "app/Core/use-cases/pros-cons/proscons-stream.usecase";
import { orthographyUseCaseProsCons } from "app/Core/use-cases/pros-cons/proscons-usecase";
import { from } from "rxjs";

@Injectable({providedIn: "root"})
export class OpenAiService {

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt)); // Uso de 'from' para convertir la promesa en un observable
  }

  checkProsCons(prompt: string) {
    return from(orthographyUseCaseProsCons(prompt));
  }

  checkProsConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCaseGenerator(prompt, abortSignal); // Se dejó timpo promesa para manejar el stream en el componente de una forma más directa.
  }
}
