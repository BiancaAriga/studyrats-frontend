import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);

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
            console.error('Erro ao fazer login automático:', error);
          },
        });
      },
      error: (error) => {
        console.error('Erro ao criar conta:', error);
      },
    });
  }
}
