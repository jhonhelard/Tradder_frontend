import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketVolume'
})
export class TicketVolumePipe implements PipeTransform {

  transform(value: number): string {
    return this.getVolumeDisplayValue(value);
  }

  private getVolumeDisplayValue(val: number): string {
    if (val > 1000000) {
      const round = val / 1000000;
      return round.toFixed(2) + 'M';
    }
    if (val > 1000) {
      const round = val / 1000;
      return round.toFixed(2) + 'K';
    }
    return val.toString();
  }
}
