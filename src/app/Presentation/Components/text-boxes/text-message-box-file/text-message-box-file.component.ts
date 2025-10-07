import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt: string | null | undefined;
}

@Component({
  selector: 'text-message-box-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
  styleUrl: './text-message-box-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextMessageBoxFileComponent {
  @Input() placeholder: string = '';
  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder)
  public form = this.fb.group({
    prompt: ['',],
    file: [null, Validators.required]
  })
  public file: File | null | undefined;

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt, file } = this.form.value;

    this.onMessage.emit({ prompt, file: file! })
    this.form.reset()
  }

  handleSelectedFile(event: any) {
    const file = event.target.files.item(0);
    //console.log('Data Archivo:', file);
    this.form.controls.file.setValue(file);
  }
}
