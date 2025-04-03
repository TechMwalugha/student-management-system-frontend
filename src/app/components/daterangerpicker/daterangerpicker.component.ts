import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-daterangerpicker',
  imports: [
    MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './daterangerpicker.component.html',
  styleUrl: './daterangerpicker.component.scss'
})
export class DaterangerpickerComponent {
  @Output() dateRangeChange = new EventEmitter<{ startDate: any; endDate: any}>();

    // Custom Validator for date range
    dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup; // ✅ Cast AbstractControl to FormGroup
      const start = group.get('start')?.value;
      const end = group.get('end')?.value;
  
      if (start && isNaN(new Date(start).getTime())) {
        return { invalidStartDate: true };
      }
      if (end && isNaN(new Date(end).getTime())) {
        return { invalidEndDate: true };
      }
      if (start && end && new Date(start) > new Date(end)) {
        return { startAfterEnd: true };
      }
  
      return null;
    };
  


  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  }, { validators: this.dateRangeValidator });

  constructor() {
    // Subscribe to form value changes and emit the updated dates.
    this.range.valueChanges.subscribe(val => {
      if(this.range.valid) {
        this.dateRangeChange.emit({
          startDate: val.start,
          endDate: val.end,
        });
      }
    });
  }

}