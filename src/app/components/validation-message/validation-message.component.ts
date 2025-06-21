import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
  @Input() message: string | null = null;
  @Input() type: 'info' | 'danger' | 'success' | 'warning' | null = 'info';
}
