import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {}
    sendError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: `${message}`, life: 3000});
      }

    sendSuccess(message: string) {
      this.messageService.add({ severity: 'success', summary: 'success', detail: `${message}`, life: 3000});
      }
  }
