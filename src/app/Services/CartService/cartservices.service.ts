import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpservicesService } from '../HttpService/httpservices.service';


@Injectable({
  providedIn: 'root',
})
export class CartservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(private http: HttpservicesService) {}
  header: any;

  getToken() {
    this.header = {
      headers: { Authorization: 'Bearer ' + this.user.token },
    };
  }

  AddBooktoCart(book: any) {
    let params = {
      UserId: this.user.userId,
      BookId: book.bookId,
    };
    this.getToken();
    return this.http.post(
      `${environment.baseUrl}/api/Cart/Cart`,
      params,
      true,
      this.header
    );
  }

  ReduceBookCountInCart(param: any) {
    this.getToken();
    return this.http.put(
      `${environment.baseUrl}/api/Cart/Cart`,
      param,
      true,
      this.header
    );
  }

  RemoveBookFromCart(cartId: any) {
    this.getToken();
    return this.http.delete(
      `${environment.baseUrl}/api/Cart/Cart?cartId=${cartId}`,
      true,
      this.header
    );
  }

  GetCart() {
    this.getToken();
    return this.http.get(
      `${environment.baseUrl}/api/Cart/Cart?userId=${this.user.userId}`,
      true,
      this.header
    );
  }
}
