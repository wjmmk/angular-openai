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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(event: string) {
    /* console.log('Componente de Ortografia: ', event); */
    this.isLoading.set(true);
    this.messages.update((prevMessages) => [...prevMessages, { text: event, isGpt: false }]);

    this.openAiService.checkOrthography(event).subscribe({
      next: (response) => {
        this.messages.update((prevMessages) => [...prevMessages, { text: response.message, isGpt: true }]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        this.messages.update((prevMessages) => [...prevMessages, { text: 'Lo siento, ha ocurrido un error al procesar tu solicitud.', isGpt: true }]);
        this.isLoading.set(false);
      }
    });
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log('Componente de Ortografia: ', { prompt, file });
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event)
  }
}
