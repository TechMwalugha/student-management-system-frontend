import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { UploadService } from '../services/upload.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload',
  imports: [HeaderComponent, SidebarComponent, ToastModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  isLoading = signal(false)

  uploadService = inject(UploadService)

  constructor(private messageService: MessageService) { }

  startUpload() {
    this.isLoading.set(true)

    this.uploadService.saveStudentDataInDB()
      .subscribe({
        next: (response) => {
          this.isLoading.set(false)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (error) => {
          this.isLoading.set(false)
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.description });
        }
      })
  }
}
