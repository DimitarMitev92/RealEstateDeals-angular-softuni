import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class EmailValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (Validators.required(control)) {
        return null;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(value);

      return isValid ? null : { email: true };
    };
  }
}
