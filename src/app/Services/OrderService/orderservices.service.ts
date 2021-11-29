import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpservicesService } from '../HttpService/httpservices.service';

@Injectable({
  providedIn: 'root',
})
export class OrderservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  header: any = {
    headers: { Authorization: 'Bearer ' + this.user.token },
  };

  constructor(private http: HttpservicesService) {}

  AddToOrders(params: any) {
    console.log(params);
    return this.http.post(
      `${environment.baseUrl}/api/placeorders`,
      params,
      true,
      this.header
    );
  }

  GetOrder() {
    return this.http.get(
      `${environment.baseUrl}/api/getorderlist?userId=${this.user.userId}`,
      true,
      this.header
    );
  }

  getToken() {
    this.header = {
      headers: { Authorization: 'Bearer ' + this.user.token },
    };
  }
}
