import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { ProcessService } from '../services/process.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-process',
  imports: [
    SidebarComponent,
    HeaderComponent, 
    ToastModule,
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {
  processService = inject(ProcessService)
  isLoading = signal(false);

  constructor(private messageService: MessageService) {

  }

  startProcess () {
    this.isLoading.set(true)
    this.processService.saveAsCSV()
    .subscribe({
      next: (response) => {
        this.isLoading.set(false)
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      },
      error: (error) => {
        this.isLoading.set(false)
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Success', detail: error?.error?.description });
      }
    })
  }
}
