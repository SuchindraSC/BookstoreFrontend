import { Injectable } from '@angular/core';
import { HttpservicesService } from '../HttpService/httpservices.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookservicesService {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(private http: HttpservicesService) {}
  getBooks() {
    return this.http.get(`${environment.baseUrl}/api/getbooks`, '');
  }

  AddtoWishList(book: any) {
    let params = {
      UserId: this.user.userId,
      BookId: book.bookId,
    };
    return this.http.post(
      `${environment.baseUrl}/api/wishlist-add-book`,
      params
    );
  }
}
