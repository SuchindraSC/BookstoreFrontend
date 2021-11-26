import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BookservicesService } from 'src/app/Services/BookService/bookservices.service';
import { WishlistservicesService } from 'src/app/Services/WishlistService/wishlistservices.service';
import { CartservicesService } from 'src/app/Services/CartService/cartservices.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackservicesService } from 'src/app/Services/FeedbackService/feedbackservices.service';
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
  constructor(
    private book: BookservicesService,
    private cartService: CartservicesService,
    private wishlist: WishlistservicesService,
    private snackBar: MatSnackBar,
    private feedBack: FeedbackservicesService
  ) {}

  ngOnInit(): void {
    this.FeedbackForm = new FormGroup({
      rate: new FormControl(''),
      comment: new FormControl('', Validators.required),
    });
    this.GetFeedBack();
    this.GetCart();
    this.init.emit();
  }
  Resize() {
    var textArea = document.getElementById('textarea')!;
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(500, textArea.scrollHeight) + 'px';
  }

  AddtoWishList() {
    this.wishlist.AddtoWishList(this.bookdetails).subscribe(
      (result: any) => {
        this.snackBar.open(result.message, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
        console.log(result);
      },
      (error) => {
        this.snackBar.open(`${error.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
      }
    );
  }

  AddBooktoCart() {
    console.log(this.bookdetails['quantity']);
    if (this.bookdetails['quantity'] > 0) {
      console.log('working');
      this.cartService
        .AddBooktoCart(this.bookdetails)
        .subscribe((result: any) => {
          console.log(result.message);
          this.snackBar.open(result.message, '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
          });
          this.ngOnInit();
        });
    } else {
      this.snackBar.open('Out of Stock! Cant add to  cart', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      });
    }
  }

  GetCart() {
    this.cartService.GetCart().subscribe((result: any) => {
      this.cartDetail = result.data;
      this.added = this.cartDetail.some(
        (element: any) => element.bookId == this.bookdetails.bookId
      );
      console.log(this.cartDetail);
    });
  }

  AddToFeedBack() {
    console.log('******************');
    console.log(this.FeedbackForm.value);
    if (this.FeedbackForm.valid) {
      this.feedBack
        .addfeedback(this.FeedbackForm.value, this.bookdetails['bookId'])
        .subscribe((result: any) => {
          console.log(result);
          this.FeedbackForm.reset();
          this.ngOnInit();
        });
    }
  }

  GetFeedBack() {
    this.feedBack
      .getFeedBack(this.bookdetails['bookId'])
      .subscribe((result: any) => {
        console.log(result);
        this.feedBackList = result.data;
        this.feedBackList.forEach((element: any) => {
          this.total += element.rating;
        });
      });
  }
}
