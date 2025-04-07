import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { StudentsService } from '../../services/students.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view',
  imports: [
    SidebarComponent, 
    HeaderComponent,
    DatePipe,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  studentsService = inject(StudentsService)

  constructor(private router: ActivatedRoute) { }

  private id : string = '';
studentData : any = signal({})

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'] 

      if(this.id) {
        this.studentsService.getStudentsPage(0, 10, { studentId: parseInt(this.id) }).subscribe({
          next: (data) => {
            if(data) {
              this.studentData.set(data.content[0])
            }
          }
        })
      }
    });

    
  }
}
