import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentStatus } from '../enums';
 
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  public transform(value: number): string {
    switch (value) {
      case AppointmentStatus.PENDING: {
        return 'Pendiente';
      }
      case AppointmentStatus.APPROVED: {
        return 'Aprobado';
      }
      case AppointmentStatus.REJECTED: {
        return 'Rechazado';
      }
      case AppointmentStatus.CANCELLED: {
        return 'Cancelado';
      }
      case AppointmentStatus.COMPLETED: {
        return 'Completado';
      }
      case AppointmentStatus.MISSED: {
        return 'Perdido';
      }
      default: {
        return '';
      }
    }
  }

}
