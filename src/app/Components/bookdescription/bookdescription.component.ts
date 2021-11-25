import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BookservicesService } from 'src/app/Services/BookService/bookservices.service';
//import { WishlistService } from 'src/app/Service/wishListService/wishlist.service';
import { CartservicesService } from 'src/app/Services/CartService/cartservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { FeedBackService } from 'src/app/Service/FeedBackService/feed-back.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-bookdescription',
  templateUrl: './bookdescription.component.html',
  styleUrls: ['./bookdescription.component.scss'],
})
export class BookdescriptionComponent implements OnInit {
  @Input() bookdetails!: any;
  @Output('init') init: EventEmitter<any> = new EventEmitter();
  FeedbackForm!: FormGroup;
  feedBackList: any = [];

  added = false;
  total = 0;
  cartDetail: any = [];
  constructor() {}

  ngOnInit(): void {}
}
