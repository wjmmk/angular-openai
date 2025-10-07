import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatBubblesComponent } from '../../Components/chat/chat-bubbles/chat-bubbles.component';
import { MyMessageComponent } from '../../Components/chat/my-message/my-message.component';
import { TypingLoaderComponent } from 'app/Presentation/Components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from 'app/Presentation/Components/text-boxes/text-message-box/text-message-box.component';
import { TextMessageEvent } from 'app/Presentation/Components/text-boxes/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxEvent } from 'app/Presentation/Components/text-boxes/text-message-box-select/text-message-box-select.component';
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
    this.isLoading.set(true); // cuando es 'true' muestra el loader.
    this.messages.update(message => [...message, { text: prompt, isGpt: false }]);

    this.openAiService.checkOrthography(prompt)
     .subscribe( resp => {
        this.isLoading.set(false);
        this.messages.update(message => [
          ...message,
          {
            isGpt: true, // es respuesta de GPT "LLM" ó desde el backend.
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
}
