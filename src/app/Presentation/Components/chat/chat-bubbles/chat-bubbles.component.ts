import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-bubbles',
  standalone: true,
  imports: [],
  templateUrl: './chat-bubbles.component.html',
  styleUrl: './chat-bubbles.component.scss'
})
export class ChatBubblesComponent {
  @Input({required: true}) text!: string;
}
