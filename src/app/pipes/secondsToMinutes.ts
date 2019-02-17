import { Pipe, PipeTransform } from '@angular/core';

// Pipe para transformar de segundos a minutos con segundos
@Pipe({ name: 'secondsToMinutes' })
export class SecondsToMinutes implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes.toString().padStart(2, '0') + ':' +
        (value - minutes * 60).toString().padStart(2, '0');
  }
}
