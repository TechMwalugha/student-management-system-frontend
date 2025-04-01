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
        path: 'logout',
        loadComponent: () => {
            return import('./logout/logout.component').then(m => m.LogoutComponent);
        },
        canActivate: [AuthGuardService]
    }
];
