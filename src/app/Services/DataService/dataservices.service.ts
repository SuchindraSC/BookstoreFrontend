import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataservicesService {
  constructor() {}
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}
