import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackservicesService {
  constructor(private http: HttpservicesService) {}

  header: any;
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  getToken() {
    this.header = {
      headers: { Authorization: 'Bearer ' + this.user.token },
    };
  }

  addfeedback(data: any, id: any) {
    let params = {
      BookId: id,
      UserName: this.user.fullName,
      Rating: parseInt(data.rate),
      Comments: data.comment,
    };
    console.log(params);
    this.getToken();
    return this.http.post(
      `${environment.baseUrl}/api/FeedBack/FeedBack`,
      params,
      true,
      this.header
    );
  }
  getFeedBack(id: any) {
    return this.http.get(
      `${environment.baseUrl}/api/FeedBack/FeedBack?bookId=${id}`,
      ''
    );
  }
}
