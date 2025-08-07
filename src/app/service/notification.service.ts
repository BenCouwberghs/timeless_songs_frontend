import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {}
    sendError(summary: string, message: string) {
      this.messageService.add({ severity: 'error', summary: `${summary}`, detail: `${message}`, life: 3000});
      }

    sendSuccess(summary: string, message: string) {
      this.messageService.add({ severity: 'success', summary: `${summary}`, detail: `${message}`, life: 3000});
      }

    sendInfo(summary: string, message: string) {
      this.messageService.add({ severity: 'info', summary: `${summary}`, detail: `${message}`, life: 3000});
      }
  }
