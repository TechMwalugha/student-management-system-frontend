import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    JsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './daterangerpicker.component.html',
  styleUrl: './daterangerpicker.component.scss'
})
export class DaterangerpickerComponent {
  @Output() dateRangeChange = new EventEmitter<{ startDate: any; endDate: any}>();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {
    // Subscribe to form value changes and emit the updated dates.
    this.range.valueChanges.subscribe(val => {
      this.dateRangeChange.emit({
        startDate: val.start,
        endDate: val.end,
      });
    });
  }

}
