import { Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HomeService } from '../services/home.service';
import { HeaderComponent } from '../components/header/header.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    SidebarComponent, 
    HeaderComponent,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private homeService: HomeService;

  TotalStudentsNo = signal<number>(0);
  isLoading = signal<boolean>(false);

  constructor() {
    this.homeService = inject(HomeService);
  }

  ngOnInit() {
    this.fetchStudents()
  }
  
  fetchStudents() {
    this.isLoading.set(true); // Set loading to true before the request
    this.homeService.getStudents().subscribe({
      next: (data) => {
        if (data) {
          this.TotalStudentsNo.set(data); // ✅ Set only the `content` array
        } else {
          console.warn("No content field in response:", data);
        }
        this.isLoading.set(false); // Set loading to false after the request
      },
      error: (err) => {
        this.isLoading.set(false); // Set loading to false on error
        console.error("Error fetching students:", err);
      }
    });
  }
}
