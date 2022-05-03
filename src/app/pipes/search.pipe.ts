import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    return value.filter(val => {
      if (val?.fullName) { return val.fullName.includes(arg); }
      if (val?.name) { return val.name.includes(arg); }
    });
  }

}
