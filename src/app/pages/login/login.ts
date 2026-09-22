import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { ApiError } from '../../services/api-error';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  
  private apiError = inject(ApiError);
  errorMessage = signal('');

  email = '';
  password = '';

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.saveToken(response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage.set(this.apiError.getMessage(error));
      },
    });
  }
}
