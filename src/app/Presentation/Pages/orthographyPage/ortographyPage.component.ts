import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatBubblesComponent } from '../../Components/chat/chat-bubbles/chat-bubbles.component';
import { MyMessageComponent } from '../../Components/chat/my-message/my-message.component';
import { TypingLoaderComponent } from 'app/Presentation/Components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from 'app/Presentation/Components/text-boxes/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from 'app/Presentation/Components/text-boxes/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from 'app/Presentation/Components/text-boxes/text-message-box-select/text-message-box-select.component';
import { Message } from 'app/Interfaces/message.interface';
import { OpenAiService } from 'app/Presentation/Services/opeai.service';
import { GptMessageOrthographyComponent } from 'app/Presentation/Components/chat/gpt-message-orthography/gpt-message-orthography.component';


@Component({
  selector: 'ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatBubblesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    /* TextMessageBoxFileComponent, */
    /* TextMessageBoxSelectComponent */
    GptMessageOrthographyComponent
  ],
  templateUrl: './ortographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrtographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    this.openAiService.checkOrthography(prompt).subscribe( resp => {
        this.isLoading.set(false);

        /* // Verificar si la respuesta es válida
        if (!resp || typeof resp.message === 'undefined') {
          this.handleError('Respuesta inválida del servidor');
          return;
        }

        // Si el mensaje es un objeto vacío, mostrar error
        if (typeof resp.message === 'object' && Object.keys(resp.message).length === 0) {
          this.handleError('El servidor está temporalmente sobrecargado. Por favor, intenta más tarde.');
          return;
        } */

        this.messages.update(message => [
          ...message,
          {
            isGpt: true,
            text: resp.message,
            info: resp
          }
        ]);

    });
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log('Componente de Ortografia: ', { prompt, file });
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event)
  }

  /* private handleError(errorMessage: string) {
    console.error(errorMessage);
    this.messages.update(messages => [
      ...messages,
      {
        text: errorMessage,
        isGpt: true,
        info: {
          userScore: 0,
          errors: [],
          message: errorMessage
        }
      }
    ]);
    this.isLoading.set(false);
  } */
}
