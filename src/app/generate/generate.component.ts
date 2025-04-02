import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {ErrorStateMatcher} from '@angular/material/core';
import { GenerateService } from '../services/generate.service';
import { catchError, map, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../components/header/header.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-generate',
  imports: [
    SidebarComponent,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    ToastModule, 
    CommonModule,
    ButtonModule,
    HeaderComponent,
  ],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss'
})

export class GenerateComponent  {

  countFormControl = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(private messageService: MessageService) {}

  matcher = new MyErrorStateMatcher()

  isLoading = signal(false);

  generateService = inject(GenerateService)

  onSubmit() {
    // Handle form submission logic here
    if(this.countFormControl.hasError('required') || this.countFormControl.hasError('min')) return
    
    this.isLoading.set(true);
    this.generateService.generateStudents(this.countFormControl.value as unknown as number)
    .subscribe({
      next: (response) => {
    
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message})
        this.isLoading.set(false);
      },
      complete: () => {
        console.log("Completed...")
      }
    })
  
  }

}
