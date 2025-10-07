import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'my-message',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMessageComponent {
  @Input({required: true}) text!: string;
}
