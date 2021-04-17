import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  public transform(duration: number): string {

    if (!duration) {
      return 'Inmediato';
    }

    const hours: number = duration / 60;
    const roundedHours: number = Math.floor(hours);
    const minutes: number = (hours - roundedHours) * 60;
    const roundedMinutes: number = Math.round(minutes);

    if (roundedHours && !roundedMinutes) {
      return roundedHours + " hora(s)";
    } else if (!roundedHours && roundedMinutes) {
      return roundedMinutes + " minuto(s)";
    }

    return roundedHours + " hora(s) y " + roundedMinutes + " minuto(s)";
  }

}