import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataservicesService } from 'src/app/Services/DataService/dataservices.service';


@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.scss'],
})
export class OrderplacedComponent implements OnInit {
  isSearch = false;
  option = 'Home';
  orderId: any;
  BookStoreUser = JSON.parse(localStorage.getItem('BookStoreUser')!);
  search: any = '';
  constructor(private route: Router, private data: DataservicesService) {}

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId');
    console.log('OrderID');
    console.log(this.orderId);
  }

  GoToHome() {
    this.route.navigateByUrl('/home');
  }

  Logout() {
    if (this.BookStoreUser != null) {
      localStorage.removeItem('BookStoreUser');
      this.route.navigateByUrl('/login');
    }
  }
}
