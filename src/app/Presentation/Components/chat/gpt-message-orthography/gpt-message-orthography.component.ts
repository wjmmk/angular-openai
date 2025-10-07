import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gpt-message-orthography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gpt-message-orthography.component.html',
  styleUrl: './gpt-message-orthography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GptMessageOrthographyComponent {

  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input() errors: string[] = [];
}
