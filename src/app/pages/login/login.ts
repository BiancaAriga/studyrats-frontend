import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.saveToken(response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
