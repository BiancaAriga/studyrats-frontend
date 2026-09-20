import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

@Service()
export class StudySession {
    private http = inject(HttpClient);

    createSession(subject: string, duration: number) {
        return this.http.post(
        'http://localhost:8000/study-sessions/',
        {
            subject: subject,
            duration: duration,
        },
        );
    }
}
