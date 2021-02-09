import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private notify: NotificationsService) { }

  success(about){
    this.notify.success("Успех", about, {
      timeOut: 2000,
      position:["bottom", "right"]
    })
  }

  error(about){
    this.notify.error("Ошибка", about, {
      timeOut: 2000,
      position:["bottom", "right"]
    })
  }

  changeStatusInfo(title, status){
    this.notify.info(title, `Статус изменен на: ${status}`, {
      timeOut: 3500,
      position:["bottom", "right"]
    })

  }


}
