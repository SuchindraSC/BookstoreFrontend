import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserservicesService {
  constructor(private http: HttpservicesService) {}
  header: any;
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

  addAddress(data: any) {
    let address = {
      UserId: parseInt(this.user.userId),
      Address: data.address,
      Type: data.type,
      City: data.city,
      state: data.state,
    };
    //console.log(this.user.token);
    //this.getToken();
    return this.http.post(
      `${environment.baseUrl}/api/addaddress`,
      address,
      true,
      this.header
    );
  }

  getAddress() {
    console.log(this.user.token);
    //let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    console.log(this.header);
    return this.http.get(
      `${environment.baseUrl}/api/getaddress?userId=${this.user.userId}`,
      true,
      this.header
    );
  }

  updateAddress(addressid: any, data: any) {
    let address = {
      AddressId: parseInt(addressid['addressId']),
      Type: data.type,
      UserId: parseInt(this.user.userId),
      Address: data.address,
      City: data.city,
      State: data.state,
    };
    console.log(this.user.token);
    //this.getToken();
    return this.http.put(
      `${environment.baseUrl}/api/editaddress`,
      address,
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
