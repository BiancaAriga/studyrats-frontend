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
    getSessions() {
        return this.http.get(
        'http://localhost:8000/study-sessions/',
        );
    }
    updateSession(
        sessionId: number,
        subject: string,
        duration: number,
    ) {
        return this.http.patch(
            `http://localhost:8000/study-sessions/${sessionId}`,
            {
                subject: subject,
                duration: duration,
            },
        );
    }
    deleteSession(sessionId: number) {
        return this.http.delete(
            `http://localhost:8000/study-sessions/${sessionId}`,
        );
    }
}
