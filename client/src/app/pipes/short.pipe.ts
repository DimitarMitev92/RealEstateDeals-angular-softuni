import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: string | undefined): any {
    if (value) {
      if (value.length > 100) {
        return `${value.substring(0, 100)}...`;
      }
      return value;
    }
  }
}
