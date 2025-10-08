import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from 'app/Interfaces';
import { ChatBubblesComponent } from 'app/Presentation/Components/chat/chat-bubbles/chat-bubbles.component';
import { MyMessageComponent } from 'app/Presentation/Components/chat/my-message/my-message.component';
import { TextMessageBoxComponent } from 'app/Presentation/Components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from 'app/Presentation/Components/typing-loader/typing-loader.component';
import { OpenAiService } from 'app/Presentation/Services/opeai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatBubblesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService)

  public abortSignal = new AbortController();

  // Importante: Recuerda que el servicio decidimos con este metodo manejarlo como Promesa.
  async handleMessage(prompt: string) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update(current => [...current, { isGpt: false, text: prompt }]);

    this.isLoading.set(true);

    const stream = await this.openAiService.checkProsConsStream(prompt, this.abortSignal.signal);

    this.isLoading.set(false);

    for await (const chunk of stream) {
      console.log({ chunk });
    }
  }
}
