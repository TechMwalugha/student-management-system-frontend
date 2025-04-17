import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-card',
  imports: [
    ToastModule,
    Dialog,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent implements OnInit {

  notificationService = inject(NotificationService);

  fromName = input('fromName');
  message = input('message');
  id = input('id');
  toName = input('toName');

  updatedMessage: string | null = null

  visible: boolean = false;

  isLoading = signal<boolean>(false)

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.updatedMessage = this.message()
  }

  showDialog() {
    this.visible = true;
  }

  deleteNotification () {
    const isConfirm = confirm('Are you sure you want to delete this notification?')

    if(!isConfirm) return

    this.notificationService.deleteNotification(this.id()).subscribe({
      next: (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message ? data.message : 'Notification deleted successfully' });

          setTimeout(() => {
            window.location.reload();
          }, 2000); // 1 second delay so toast is visible
      }, 
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting notification' });
        console.log(error)
      }
    })
  }

  updateNotification() {
    this.isLoading.set(true)

    if(!this.updatedMessage) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sorry, message cannot be empty' });
      this.isLoading.set(false)
      return
    }

    if(this.updatedMessage === this.message()) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Sorry, no change detected' });
      this.isLoading.set(false)
      return
    }

    const notification = {
      notificationId: this.id() as unknown as number,
      message: this.updatedMessage,
    }

    this.notificationService.updateNotification(notification).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message ? data.message : 'Notification updated successfully' });
        this.isLoading.set(false)

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating notification' });
        console.log(error)
        this.isLoading.set(false)
        this.visible = false
      }
    })
  }
}
