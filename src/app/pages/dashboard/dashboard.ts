import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Quote } from '../../services/quote';
import { StudySession } from '../../services/study-session';
import { Ranking } from '../../services/ranking';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private auth = inject(Auth);
  private quote = inject(Quote);
  private studySession = inject(StudySession);
  private rankingService = inject(Ranking);

  userName = signal('');
  quoteText = signal('');
  quoteAuthor = signal('');
  rankingPosition = signal<number | null>(null);
  ranking = signal<
    {
      user_id: number;
      user_name: string;
      total_duration: number;
    }[]
  >([]);
  totalStudyTime = signal(0);
  sessionCount = signal(0);

  ngOnInit() {
    this.auth.getMe().subscribe({
      next: (user) => {
        this.userName.set(user.name);

        this.rankingService.getRanking().subscribe({
          next: (ranking) => {
            this.ranking.set(ranking);
            const position = ranking.findIndex(
              (rankingUser) => rankingUser.user_id === user.id,
            );

            if (position !== -1) {
              this.rankingPosition.set(position + 1);
            }
          },
        });
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

    this.studySession.getSessions().subscribe({
      next: (response) => {
        const sessions = response as {
          id: number;
          subject: string;
          duration: number;
        }[];

        this.sessionCount.set(sessions.length);

        const total = sessions.reduce(
          (sum, session) => sum + session.duration,
          0,
        );

        this.totalStudyTime.set(total);
      },
      error: (error) => {
        console.error('Erro ao buscar sessões:', error);
      },
    });
  }
}
