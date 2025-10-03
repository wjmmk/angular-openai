import { inject, Injectable, signal } from "@angular/core";
import { orthographyUseCase } from "app/Core/use-cases/orthography/orthography-usecase";
import { Message } from "app/Interfaces";
import { from } from "rxjs";

@Injectable({providedIn: "root"})
export class OpenAiService {

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }
}
