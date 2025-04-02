import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button'; 
import { AppComponent } from './app.component'; // ✅ Import the standalone component
@NgModule({
  imports: [ // ✅ Correct way for standalone component
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule { }
