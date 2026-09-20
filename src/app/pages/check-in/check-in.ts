import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudySession } from '../../services/study-session';

@Component({
  imports: [FormsModule],
  selector: 'app-check-in',
  styleUrl: './check-in.css',
  templateUrl: './check-in.html',
})
export class CheckIn {
  private studySession = inject(StudySession);
  
  subject = '';
  duration = 0;

  registerStudy() {
    this.studySession.createSession(this.subject, this.duration).subscribe({
      next: (response) => {
        console.log('Sessão criada:', response);
      },
      error: (error) => {
        console.error('Erro ao criar sessão:', error);
      },
    });
  }
}
