import { AbstractControl, ValidatorFn } from '@angular/forms';

export class HttpsValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const urlPattern = /^https:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
      const isHttps = urlPattern.test(control.value);

      return isHttps ? null : { https: true };
    };
  }
}
