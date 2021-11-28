import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(private http: HttpservicesService) {}
  header: any = { headers: { Authorization: 'Bearer ' + this.user.token } };
  
  
  getBooks() {
    return this.http.get(`${environment.baseUrl}/api/getbooks`, '');
  }
}
