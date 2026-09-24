import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

@Service()
export class Quote {
  private http = inject(HttpClient);

  getRandomQuote() {
    return this.http.get<{
      quote: string;
      author: string;
    }>(
      'http://localhost:8000/quotes/random',
    );
  }
}