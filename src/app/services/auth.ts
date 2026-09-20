import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

@Service()
export class Auth {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(
      'http://localhost:8000/auth/login',
      {
        email: email,
        password: password
      }
    );
  }
  
  register(name: string, email: string, password: string) {
    return this.http.post(
      'http://localhost:8000/users/',
      {
        name: name,
        email: email,
        password: password,
      },
    );
  }
  
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getStudySessions() {
    return this.http.get('http://localhost:8000/study-sessions/');
  }
}