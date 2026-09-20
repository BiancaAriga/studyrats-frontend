import { Component, inject } from '@angular/core';
import { StudySession } from '../../services/study-session';

@Component({
  imports: [],
  selector: 'app-sessions',
  styleUrl: './sessions.css',
  templateUrl: './sessions.html',
})
export class Sessions {
  private studySession = inject(StudySession);

  sessions: any[] = [];

  ngOnInit() {
    this.studySession.getSessions().subscribe({
      next: (response) => {
        this.sessions = response as any[];
        console.log('Sessões:', this.sessions);
      },
      error: (error) => {
        console.error('Erro ao buscar sessões:', error);
      },
    });
  }
}
