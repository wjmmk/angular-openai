import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  id: string;
  text: string
}

export interface TextMessageBoxEvent {
  prompt: string | null | undefined;
  selectedOption: string | null | undefined;
}

@Component({
  selector: 'text-message-box-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
  styleUrl: './text-message-box-select.component.scss'
})
export class TextMessageBoxSelectComponent {
  @Input() placeholder: string = '';
  @Input({required: true}) options!: Option[];
  @Output() onMessage = new EventEmitter<TextMessageBoxEvent>();

  public fb = inject(FormBuilder)
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required]
  })

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt, selectedOption } = this.form.value;
    //console.log('Esto viene de la Caja de Texto...', { prompt })
    this.onMessage.emit({ prompt, selectedOption })
    this.form.reset()
  }
}
