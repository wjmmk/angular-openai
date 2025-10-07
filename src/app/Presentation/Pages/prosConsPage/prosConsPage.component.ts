import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from 'app/Interfaces';
import { ChatBubblesComponent } from 'app/Presentation/Components/chat/chat-bubbles/chat-bubbles.component';
import { MyMessageComponent } from 'app/Presentation/Components/chat/my-message/my-message.component';
import { TextMessageBoxEvent } from 'app/Presentation/Components/text-boxes/text-message-box-select/text-message-box-select.component';
import { TextMessageBoxComponent } from 'app/Presentation/Components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from 'app/Presentation/Components/typing-loader/typing-loader.component';
import { OpenAiService } from 'app/Presentation/Services/opeai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatBubblesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsPageComponent {

  public messages = signal<Message[]>([]);
    public isLoading = signal(false);

    openAiService = inject(OpenAiService)

    handleMessage(prompt: string) {
      this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

      this.isLoading.set(true);
      this.openAiService.checkProsCons(prompt).subscribe({
        next: (resp) => {
          this.isLoading.set(false);
          this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);
          this.messages.update(messages => [...messages, { text: resp.message, isGpt: true }]);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Error al procesar la solicitud:', err);
        }
      });
    }

    handleMessageWithSelect(event: TextMessageBoxEvent) {
      console.log(event)
    }

}
