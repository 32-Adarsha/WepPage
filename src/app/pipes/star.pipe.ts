import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star'
})
export class StarPipe implements PipeTransform {

  transform(value:number|string): unknown {
    return '⭐'.repeat(Number(value));
  }

}
