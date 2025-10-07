import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'text-message-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box.component.html',
  styleUrl: './text-message-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextMessageBoxComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;
  @Output() onMessage = new EventEmitter<string>();

  public fb = inject(FormBuilder)
  public form = this.fb.group({
    prompt: ['', Validators.required]
  })

  handleSubmit() {
    if(this.form.invalid) return;
    const { prompt } = this.form.value;
    this.onMessage.emit(prompt ?? '')
    this.form.reset()
  }
}
