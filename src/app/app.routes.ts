import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth/auth-guard';
import { homeGuard } from './core/auth/home-guard';
import { guestGuard } from './core/auth/guest-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [homeGuard],
    children: [],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
];