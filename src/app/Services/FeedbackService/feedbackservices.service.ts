import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackservicesService {
  constructor(private http: HttpservicesService) {}
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  header: any = {
    headers: { Authorization: 'Bearer ' + this.user.token },
  };

  addfeedback(data: any, id: any) {
    let params = {
      userId: parseInt(this.user.userId),
      BookId: parseInt(id),
      customerName: this.user.fullName,
      rating: parseInt(data.rate),
      feedback: data.comment,
    };
    console.log(params);
    return this.http.post(
      `${environment.baseUrl}/api/addcustomerfeedBack`,
      params,
      true,
      this.header
    );
  }

  getFeedBack(id: any) {
    return this.http.get(
      `${environment.baseUrl}/api/GetFeedback?bookid=${id}`,
      ''
    );
  }
}
