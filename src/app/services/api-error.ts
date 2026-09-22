import { HttpErrorResponse } from '@angular/common/http';
import { Service } from '@angular/core';

@Service()
export class ApiError {
  getMessage(error: HttpErrorResponse): string {
    if (!error.status) {
      return 'Não foi possível conectar ao servidor. Tente novamente.';
    }

    if (typeof error.error?.detail === 'string') {
      return error.error.detail;
    }

    return 'Ocorreu um erro inesperado. Tente novamente.';
  }
}