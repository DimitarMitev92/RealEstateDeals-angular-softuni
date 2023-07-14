import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (Validators.required(control)) {
      return null;
    }

    if (isNaN(value) || typeof value !== 'number') {
      return { number: true };
    }

    return null;
  };
}
