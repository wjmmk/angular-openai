import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-message',
  standalone: true,
  imports: [],
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.scss'
})
export class MyMessageComponent {
  @Input({required: true}) text!: string;
}
