import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'typing-loader',
  standalone: true,
  imports: [],
  templateUrl: './typing-loader.component.html',
  styleUrl: './typing-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingLoaderComponent {

}
