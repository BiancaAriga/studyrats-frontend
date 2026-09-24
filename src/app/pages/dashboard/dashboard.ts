import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Quote } from '../../services/quote';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private auth = inject(Auth);
  private quote = inject(Quote);

  userName = signal('');
  quoteText = signal('');
  quoteAuthor = signal('');

  ngOnInit() {
    this.auth.getMe().subscribe({
      next: (user) => {
        this.userName.set(user.name);
      },
    });
    this.quote.getRandomQuote().subscribe({
      next: (response) => {
        this.quoteText.set(response.quote);
        this.quoteAuthor.set(response.author);
      },
      error: (error) => {
        console.error('Erro ao buscar quote:', error);
      },
    });
  }
}
