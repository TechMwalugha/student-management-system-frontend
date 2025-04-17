import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HeaderComponent } from '../components/header/header.component';
import { NotificationCardComponent } from '../components/notification-card/notification-card.component';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  imports: [
    SidebarComponent, 
    HeaderComponent, 
    NotificationCardComponent,
    ButtonModule,
    CommonModule,
    Dialog,
    InputTextModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  studentId: number | null = null
  message: string | null = null

  isLoading = signal(false)

  notifications: any[] = [];

  notificationService = inject(NotificationService);

  visible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getNotifications()
  }

  showDialog() {
    this.visible = true;
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data: any[]) => {
        this.notifications = data;
        console.log('Notifications:', this.notifications);
      },
      error: (error: any) => {
        console.error('Error fetching notifications:', error);
      }
    })
  }

  createNotification() {
    this.isLoading.set(true)
    
    const notification = {
      fromEmail: JSON.parse(localStorage.getItem('user') || '{}').email,
      studentId: this.studentId,
      message: this.message,
    }

    if(!this.studentId || !this.message) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields' });
      this.isLoading.set(false)
      return;
    }

    this.notificationService.createNotification(notification).subscribe({
      next: (data) => {
        console.log('Notification created:', data);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification created successfully' });
        this.isLoading.set(false)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.description ? error?.error?.description : 'Error creating notification' });
        setTimeout(() => {
          this.visible = false;
          this.isLoading.set(false)
        }, 2000)
      }
    })
  }

  trackByIndex(index: number): number {
    return index
  }

}
