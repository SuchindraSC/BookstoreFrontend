import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpservicesService } from '../HttpService/httpservices.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  header: any = {
    headers: { Authorization: 'Bearer ' + this.user.token },
  };

  constructor(private http: HttpservicesService) {}

  AddtoWishList(book: any) {
    let params = {
      UserId: parseInt(this.user.userId),
      BookId: parseInt(book.bookId),
    };
    //this.getToken();
    return this.http.post(
      `${environment.baseUrl}/api/wishlist-add-book?bookId=${book.bookId}&userId=${this.user.userId}`,
      null,
      true,
      this.header
    );
  }

  GetWishList() {
    //this.getToken();
    return this.http.get(
      `${environment.baseUrl}/api/wishlistgetbooks?userId=${this.user.userId}`,
      true,
      this.header
    );
  }

  RemoveFromWishList(list: any) {
    //this.getToken();
    return this.http.delete(
      `${environment.baseUrl}/api/wishlistdeletebook?wishlistId=${list}`,
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
