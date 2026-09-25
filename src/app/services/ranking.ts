import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

@Service()
export class Ranking {
  private http = inject(HttpClient);

  getRanking() {
    return this.http.get<{
      user_id: number;
      user_name: string;
      total_duration: number;
    }[]>(
      'http://localhost:8000/ranking/',
    );
  }
}