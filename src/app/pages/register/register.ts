import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(Auth);

  name = '';
  email = '';
  password = '';

  register() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Conta criada com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao criar conta:', error);
      },
    });
  }
}
