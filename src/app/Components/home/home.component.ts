import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookservicesService } from 'src/app/Services/BookService/bookservices.service';
import { CartservicesService } from 'src/app/Services/CartService/cartservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isSearch = false;
  books = [];
  new = [];
  option = 'Home';
  sortOption = 0;
  bookId = 0;
  search: any = '';
  getCart: any = [];
  bookdetails: any;
  BookStoreUser = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor(
    private route: Router,
    private book: BookservicesService,
    private cartService: CartservicesService
  ) {}
  p: number = 1;
  ngOnInit(): void {
    console.log(this.BookStoreUser);
    this.getBooks();
    this.GetCart();
  }

  Logout() {
    if (this.BookStoreUser != null) {
      localStorage.removeItem('BookStoreUser');
      this.route.navigateByUrl('/home');
      location.reload();
    }
  }

  getBooks() {
    this.book.getBooks().subscribe((result: any) => {
      this.books = result.data;
      this.new = Array.from(this.books);
      //this.sort();

      console.log(result);
    });
  }
  sort(num: any) {
    if (num == 1) {
      this.books.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
      console.log(this.books);
    } else if (num == 2) {
      this.books.sort((a: any, b: any) => (a.price < b.price ? 1 : -1));
      console.log(this.books);
    } else if (num == 3) {
      this.new.reverse();
      this.books = Array.from(this.new);
      this.new.reverse();
      console.log(this.books);
    }
  }

  Search() {
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.books = this.books.filter((res: any) => {
        return res.title
          ?.toLocaleLowerCase()
          .match(this.search.toLocaleLowerCase());
      });
    }
  }
  GetCart() {
    this.cartService.GetCart().subscribe((result: any) => {
      this.getCart = result.data;
      console.log(this.getCart);
    });
  }
}
