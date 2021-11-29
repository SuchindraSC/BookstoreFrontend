import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpservicesService } from '../HttpService/httpservices.service';

@Injectable({
  providedIn: 'root',
})
export class CartservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(private http: HttpservicesService) {}
  header: any = { headers: { Authorization: 'Bearer ' + this.user.token } };

  AddBooktoCart(book: any) {
    return this.http.post(
      `${environment.baseUrl}/api/cartaddbook?bookId=${book.bookId}&userId=${this.user.userId}`,
      null,
      true,
      this.header
    );
  }

  ReduceBookCountInCart(param: any) {
    return this.http.put(
      `${environment.baseUrl}/api/Cart/Cart`,
      param,
      true,
      this.header
    );
  }

  RemoveBookFromCart(cartId: any) {
    return this.http.delete(
      `${environment.baseUrl}/api/cartdeletebook?cartId=${cartId}`,
      true,
      this.header
    );
  }

  GetCart() {
    return this.http.get(
      `${environment.baseUrl}/api/cartgetbooks?userId=${this.user.userId}`,
      true,
      this.header
    );
  }

  updatecart(cartbook: any) {
    return this.http.put(
      `${environment.baseUrl}/api/cartupdatebook?cartId=${cartbook.cartId}&quantityToBuy=${cartbook.quantityToBuy}`,
      null,
      true,
      this.header
    );
  }
}
