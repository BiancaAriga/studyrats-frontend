import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudySession } from '../../services/study-session';
import { ApiError } from '../../services/api-error';

@Component({
  imports: [FormsModule],
  selector: 'app-check-in',
  styleUrl: './check-in.css',
  templateUrl: './check-in.html',
})
export class CheckIn {
  private studySession = inject(StudySession);
  private apiError = inject(ApiError);

  subject = '';
  duration = 0;

  successMessage = signal('');
  errorMessage = signal('');


  registerStudy() {
    this.successMessage.set('');
    this.errorMessage.set('');
    this.studySession.createSession(this.subject, this.duration).subscribe({
      next: () => {
        this.successMessage.set(
          'Sessão registrada com sucesso!'
        );
        this.subject = '';
        this.duration = 0;
      },
      error: (error) => {
        this.errorMessage.set(
          this.apiError.getMessage(error)
        );
      },
    });
  }
}
