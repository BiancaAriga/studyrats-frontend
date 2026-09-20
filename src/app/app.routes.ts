import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth/auth-guard';
import { homeGuard } from './core/auth/home-guard';
import { guestGuard } from './core/auth/guest-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { CheckIn } from './pages/check-in/check-in';
import { Sessions } from './pages/sessions/sessions';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [homeGuard],
    children: [],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'check-in',
        component: CheckIn,
      },
      {
        path: 'sessoes',
        component: Sessions,
      },
    ],
  },
];