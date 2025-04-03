import { Component, inject, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { DaterangerpickerComponent } from "../components/daterangerpicker/daterangerpicker.component";
import { StudentsService } from '../services/students.service';
import { filterType, paginatorQuery } from '../models/sidebar.todo';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { formatDate } from '../models/formatters';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-students',
  imports: [
    MatTableModule,
    SidebarComponent,
    HeaderComponent,
    DaterangerpickerComponent,
    MatPaginatorModule,
    MatProgressBarModule,
    CommonModule,
    ToastModule,
    DatePipe
],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent implements OnInit {
  students = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  displayedColumns: string[] = ['studentId', 'firstName', 'lastName', 'dob', 'studentClass', 'score', 'status', 'action'];
  paginatorQuery = signal<paginatorQuery>({
    last: false,
    totalPages: 1,
    totalElements: 20,
    size: 20,
    number: 0,
    sort: {
        empty: true,
        sorted: false,
        unsorted: true
    },
    numberOfElements: 20,
    first: true,
    empty: false,
  })

  filter = signal<filterType>({
    studentId: undefined,
    studentClass: undefined,
    startDate: undefined,
    endDate: undefined
  })

  studentsService = inject(StudentsService)

  constructor(private messageService: MessageService) {

  }
  
  ngOnInit() {
    this.fetchStudents()
  }

  fetchStudents() {
    this.isLoading.set(true);
    this.studentsService.getStudents().subscribe({
      next: (response: any) => {
        this.students.set(response.content);
        this.paginatorQuery.set({
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          empty: response.empty
        })

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.isLoading.set(false);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.isLoading.set(true);
    this.studentsService.getStudentsPage(e.pageIndex, e.pageSize, this.filter()).subscribe({
      next: (response: any) => {
        this.students.set(response.content);
        this.paginatorQuery.set({
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          empty: response.empty
        })
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error)
        this.isLoading.set(false);
      }
    })
  }

  onKey(e: any) {

    this.isLoading.set(true)

    this.filter.set({
      studentId: e.target.value ? e.target.value : undefined,
      studentClass: this.filter().studentClass,
      startDate: this.filter().startDate,
      endDate: this.filter().endDate
    })

    this.studentsService.getStudentsPage(this.paginatorQuery().number, this.paginatorQuery().size, this.filter()).subscribe({
      next: (response: any) => {
        this.students.set(response.content);
        this.paginatorQuery.set({
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          empty: response.empty
        })

        this.isLoading.set(false)
      },
      error: (error) => {
        console.log(error)
        this.isLoading.set(false)
      }
    })
  }

  onClassChange(e: any) {
    this.isLoading.set(true)
    
    this.filter.set({
      studentId: undefined,
      studentClass: e.target.value ? e.target.value : '',
      startDate: this.filter().startDate,
      endDate: this.filter().endDate
    })

    this.studentsService.getStudentsPage(this.paginatorQuery().number, this.paginatorQuery().size, this.filter()).subscribe({
      next: (response: any) => {

        if(!response) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `No students found that are in ${this.filter().studentClass ? this.filter().studentClass : 'the system '} ${this.filter().startDate ? 'with that date range.' : '.'}` });
          this.isLoading.set(false);
          return 
        }

        this.students.set(response.content);
        this.paginatorQuery.set({
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          empty: response.empty
        })
        this.isLoading.set(false)
      },
      error: (error) => {
        console.log(error)
        this.isLoading.set(false)
      }
    })
  }

   // This function is triggered when the daterangerpicker emits a new date range.
   onDateRangeChange(dateRange: { startDate: Date | null; endDate: Date | null }) {
    
    
    // Update the filter signal with new dates.
    this.filter.set({
      studentId: undefined,
      studentClass: this.filter().studentClass,
      startDate: formatDate(dateRange.startDate),
      endDate: formatDate(dateRange.endDate)
    });
    
    this.isLoading.set(true);
    this.studentsService.getStudentsPage(this.paginatorQuery().number, this.paginatorQuery().size, this.filter()).subscribe({
      next: (response: any) => {
        
        if(!response) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `No students found with dob range from ${this.filter().startDate} to ${this.filter().endDate} ${this.filter().studentClass ? 'and are in that class.' : '.'}` });
          this.isLoading.set(false);
          return 
        }

        this.students.set(response.content);
        this.paginatorQuery.set({
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          empty: response.empty
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.isLoading.set(false);
      }
    });
  }

}
