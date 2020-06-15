import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'game'
})
export class GamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
