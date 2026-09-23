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

    if (Array.isArray(error.error?.detail)) {
      return this.getValidationMessage(error.error.detail);
    }

    return 'Ocorreu um erro inesperado. Tente novamente.';
  }

  private getValidationMessage(details: any[]): string {
    const error = details[0];

    const field = error?.loc?.[1];

    switch (field) {
      case 'email':
        return 'Digite um e-mail válido.';

      case 'password':
        return 'A senha deve ter pelo menos 8 caracteres.';

      case 'name':
        return 'O nome deve ter entre 1 e 100 caracteres.';

      default:
        return 'Verifique os dados informados.';
    }
  }
}