import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudySession } from '../../services/study-session';

@Component({
  imports: [FormsModule],
  selector: 'app-sessions',
  styleUrl: './sessions.css',
  templateUrl: './sessions.html',
})
export class Sessions {
  private studySession = inject(StudySession);

  sessions = signal<any[]>([]);

  editingSessionId: number | null = null;
  editSubject = '';
  editDuration = 0;

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.studySession.getSessions().subscribe({
      next: (response) => {
        this.sessions.set(response as any[]);
      },
      error: (error) => {
        console.error('Erro ao buscar sessões:', error);
      },
    });
  }

  startEditing(session: any) {
    this.editingSessionId = session.id;
    this.editSubject = session.subject;
    this.editDuration = session.duration;
  }

  updateSession() {
    if (this.editingSessionId === null) {
      return;
    }

    this.studySession
      .updateSession(
        this.editingSessionId,
        this.editSubject,
        this.editDuration,
      )
      .subscribe({
        next: () => {
          console.log('Sessão atualizada');

          this.editingSessionId = null;
          this.loadSessions();
        },
        error: (error) => {
          console.error('Erro ao atualizar sessão:', error);
        },
      });
  }
  deleteSession(sessionId: number) {
    this.studySession.deleteSession(sessionId).subscribe({
      next: () => {
        console.log('Sessão excluída');

        this.loadSessions();
      },
      error: (error) => {
        console.error('Erro ao excluir sessão:', error);
      },
    });
  }
}
