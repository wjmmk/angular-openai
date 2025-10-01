import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TypingLoaderComponent } from 'app/Presentation/Components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from 'app/Presentation/Components/text-boxes/text-message-box/text-message-box.component';
import { TextMessageBoxEvent } from 'app/Presentation/Components/text-boxes/text-message-box-select/text-message-box-select.component';
import { Message } from 'app/Interfaces/message.interface';
import { OpenAiService } from 'app/Presentation/Services/opeai.service';
import { ChatBubblesComponent } from 'app/Presentation/Components/chat/chat-bubbles/chat-bubbles.component';
import { MyMessageComponent } from 'app/Presentation/Components/chat/my-message/my-message.component';


@Component({
  selector: 'chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ChatBubblesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatTemplateComponent {

  public messages = signal<Message[]>([{text: 'Es una prueba', isGpt: false }]);
  public isLoading = signal(false);

  openAiService = inject(OpenAiService)

  handleMessage(event: string) {
    console.log('Desde el Componente de Ortografia: ', event);
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event)
  }
}
