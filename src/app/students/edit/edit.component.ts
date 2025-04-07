import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { StudentsService } from '../../services/students.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit',
  imports: [
    SidebarComponent,
    HeaderComponent,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    DatePipe,
    ToastModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {

  studentData: any = signal({})
  isLoading = signal(false)

  readonly firstName = new FormControl('', [Validators.required]);
  readonly lastName = new FormControl('', [Validators.required]);
  readonly dob = new FormControl('', [Validators.required]);
  readonly studentClass = new FormControl('', [Validators.required]);
  readonly score = new FormControl('', [Validators.required]);
  readonly status = new FormControl('', [Validators.required]);

  errorMessage = signal('');

  updateErrorMessage() {
    if (this.firstName.hasError('required') || this.lastName.hasError('required') || this.dob.hasError('required') || this.studentClass.hasError('required') || this.score.hasError('required') || this.status.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  constructor(private router: ActivatedRoute, private messageService: MessageService, private routerPage: Router) {
    this.firstName.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    this.lastName.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    this.dob.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    this.studentClass.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    this.score.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    this.status.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
  }

  studentsService = inject(StudentsService)
  private id: string = '';

  previewImage: string | ArrayBuffer | null = null;
selectedFile: File | null = null;

originalData: any = {}; // stores original values for comparison

ngOnInit(): void {
  this.router.params.subscribe(params => {
    this.id = params['id'];
    if (this.id) {
      this.studentsService.getStudentsPage(0, 10, { studentId: parseInt(this.id) }).subscribe({
        next: (data) => {
          if (data) {
            const student = data.content[0];
            this.studentData.set(student);
            this.originalData = { ...student }; // Save original for later comparison

            // Set form values
            this.firstName.setValue(student.firstName);
            this.lastName.setValue(student.lastName);
            this.dob.setValue(student.dob.split('T')[0]); // Format for <input type="date">
            this.studentClass.setValue(student.studentClass);
            this.score.setValue(student.score);
            this.status.setValue(student.status);
          }
        }
      });
    }
  });
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

submitUpdate() {
  this.isLoading.set(true)
  const formData = new FormData();

  const normalize = (value: any) => {
    if (typeof value === 'string') return value.trim();
    if (value instanceof Date) return value.toISOString().split('T')[0];
    return value;
  };
  
  const original = {
    firstName: normalize(this.originalData.firstName),
    lastName: normalize(this.originalData.lastName),
    dob: normalize(this.originalData.dob?.split('T')[0]), // ISO to YYYY-MM-DD
    studentClass: normalize(this.originalData.studentClass),
    score: normalize(this.originalData.score),
    status: normalize(this.originalData.status),
  };
  
  const updated = {
    firstName: normalize(this.firstName.value),
    lastName: normalize(this.lastName.value),
    dob: normalize(this.dob.value),
    studentClass: normalize(this.studentClass.value),
    score: normalize(this.score.value),
    status: normalize(this.status.value),
  };
  
  const isChanged = (Object.keys(updated) as Array<keyof typeof updated>)
    .some(key => updated[key] !== original[key]) || !!this.selectedFile;

  if (!isChanged) {
    this.isLoading.set(false)
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No changes made to update'})
    return;
  }


  // Append fields
  for (let key of Object.keys(updated) as Array<keyof typeof updated>) {
    formData.append(key, updated[key]);
  }

  if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }



  this.studentsService.updateStudent(this.id, formData).subscribe({
    next: (res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${res.message}` });
      this.isLoading.set(false)
      this.routerPage.navigate([`/students/edit/${this.studentData().studentId}`])
    },
    error: (err) => {
      console.log(err)
    }
  });

}


}
