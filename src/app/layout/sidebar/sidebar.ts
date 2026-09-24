import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private auth = inject(Auth);
  private router = inject(Router);

  userName = signal('');

  ngOnInit() {
    this.auth.getMe().subscribe({
      next: (user) => {
        this.userName.set(user.name);
      },
    });
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}