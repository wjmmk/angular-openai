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


@Component({
  selector: 'ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatBubblesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    /* TextMessageBoxComponent */
    /* TextMessageBoxFileComponent, */
    TextMessageBoxSelectComponent
  ],
  templateUrl: './ortographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {

  public messages = signal<Message[]>([{text: 'Esto me ayudará a crear aplicaciones mucho más efectivas.', isGpt: false }]);
  public isLoading = signal(false);

  openAiService = inject(OpenAiService)

  handleMessage(event: TextMessageEvent) {
    console.log('Desde el Componente de Ortografia: ', event);
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event)
  }
}
