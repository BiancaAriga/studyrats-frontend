import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { ApiError } from '../../services/api-error';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);
  private apiError = inject(ApiError);
  errorMessage = signal('');

  name = '';
  email = '';
  password = '';

  register() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Conta criada com sucesso:', response);

        this.auth.login(this.email, this.password).subscribe({
          next: (response) => {
            this.auth.saveToken(response.access_token);

            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage.set(
              this.apiError.getMessage(error)
            );
          },
        });
      },
      error: (error) => {
        console.log('ERRO DE CADASTRO:', error);
        this.errorMessage.set(
          this.apiError.getMessage(error)
        );
      },
    });
  }
}
