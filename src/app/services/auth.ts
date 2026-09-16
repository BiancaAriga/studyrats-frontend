import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

@Service()
export class Auth {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(
      'http://localhost:8000/auth/login',
      {
        email: email,
        password: password
      }
    );
  }
}