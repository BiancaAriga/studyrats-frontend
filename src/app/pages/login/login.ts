import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);

  email = '';
  password = '';

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.saveToken(response.access_token);
        console.log('Login realizado com sucesso');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
