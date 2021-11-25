import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserservicesService {
  constructor(private http: HttpservicesService) {}

  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  Register(data: any) {
    const userData = {
      fullName: data.FullName,
      email: data.Email,
      password: data.Password,
      phone: data.Mobile,
    };
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/register`, userData);
  }

  Login(data: any) {
    const userData = {
      email: data.email,
      password: data.password,
    };
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/login`, userData);
  }

  ForgotPassword(data: any) {
    const userData = {
      email: data.email,
    };
    console.log(userData);
    return this.http.post(
      `${environment.baseUrl}/api/forgot-password?email=${data.email}`
    );
  }

  ResetPassword(data: any, token: any) {
    console.log(data.password);
    const userData = {
      CustomerId: parseInt(
        JSON.parse(localStorage.getItem('BookStoreUser')!).userId
      ),
      password: data.password,
      token: token,
    };
    return this.http.post(
      `${environment.baseUrl}/api/reset-password`,
      userData
    );
  }
}
