import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    return `+${value.slice(0, 1)}(${value.slice(1, 4)})-${value.slice(4, 7)}-${value.slice(7)}`;
  }

}
