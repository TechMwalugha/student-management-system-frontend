import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    ToastModule, 
    CommonModule,
    ToastModule,
    ButtonModule, 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.authService.isAuthenticated()
    .subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });

  }



  constructor (private messageService: MessageService, private router: Router) {}

  matcher = new MyErrorStateMatcher();

  authService = inject(AuthService);

  onSubmit() {

    this.isLoading.set(true)

    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required') || this.emailFormControl.value == null || this.passwordFormControl.value == null) return
    
    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value)
    .pipe(
      catchError((error) => {
        console.error('Login error:', error);
  
        // Extract the error message properly
        const errorMessage = error?.error?.description || 'Login failed. Please try again.';
        
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: errorMessage });
  
        this.isLoading.set(false);
        return of(null); // Prevents breaking the stream
      })
    )
    .subscribe((res) => {
      if (res && typeof res === 'object') {  // ✅ Ensure res is a valid object before parsing

        this.router.navigate(['/'])
  
      } else {
        console.warn('Unexpected response format:', res);
      }

      this.isLoading.set(false);
    });
  

}

}
