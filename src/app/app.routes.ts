import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then(m => m.HomeComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./login/login.component').then(m => m.LoginComponent);
        }
    },
    {
        path: 'generate',
        loadComponent: () => {
            return import('./generate/generate.component').then(m => m.GenerateComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'process',
        loadComponent: () => {
            return import('./process/process.component').then(m => m.ProcessComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'upload',
        loadComponent: () => {
            return import('./upload/upload.component').then(m => m.UploadComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'students',
        loadComponent: () => {
            return import('./students/students.component').then(m => m.StudentsComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'students/view/:id',
        loadComponent: () => {
            return import('./students/view/view.component').then(m => m.ViewComponent);
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'students/edit/:id',
        loadComponent: () => {
            return import('./students/edit/edit.component').then(m => m.EditComponent)
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'notifications',
        loadComponent: () => {
            return import('./notifications/notifications.component').then(m => m.NotificationsComponent)
        }
    },
    {
        path: 'logout',
        loadComponent: () => {
            return import('./logout/logout.component').then(m => m.LogoutComponent);
        },
        canActivate: [AuthGuardService]
    }
];
