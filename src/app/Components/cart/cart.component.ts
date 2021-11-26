import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserservicesService } from 'src/app/Services/UserService/userservices.service';
import { CartservicesService } from 'src/app/Services/CartService/cartservices.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { DataservicesService } from 'src/app/Services/DataService/dataservices.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private userService: UserservicesService,
    private cartService: CartservicesService,
    private route: Router,
    private snackBar: MatSnackBar,
    private data: DataservicesService
  ) {}
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  @Output('init') init: EventEmitter<any> = new EventEmitter();
  cart = [1];
  placeorder: any = 'order';
  addedit = false;
  edit = false;
  newadd = false;
  address = false;
  expand = false;
  result1 = 0;
  cartDetails: any = [];
  checked: any;
  radio: string = '';
  AddressForm!: FormGroup;
  userAddress: any;
  orderId: any;
  monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  ngOnInit(): void {
    this.GetCart();
    this.getAddress();
    this.AddressForm = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
    this.check();
    this.init.emit();
  }

  add(count: any) {
    console.log(parseInt(count) + 1);
  }
  check() {
    if (this.AddressForm.get('address')?.value == '') {
      console.log(this.AddressForm.value);
      this.newadd = true;
    }
  }

  addAddress() {
    this.userService
      .addAddress(this.AddressForm.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  getAddress() {
    this.userService.getAddress().subscribe((result: any) => {
      this.userAddress = result.data;
      console.log('getAddress');
      console.log(result);
    });
  }

  editaddress(data: any) {
    console.log(this.AddressForm.value);
    this.userService
      .updateAddress(data, this.AddressForm.value)
      .subscribe((result: any) => {
        console.log(result);
        this.expand = false;
        this.address = false;
        this.checked = '';
        this.getAddress();
      });
  }

  change(data: any) {
    this.checked = data['addressId'];
    this.radio = data['type'];
    console.log(data);
  }

  addtoCart(cartbook: any) {
    console.log('working');
    console.log(cartbook);
    this.cartService.AddBooktoCart(cartbook).subscribe((result: any) => {
      console.log(result.message);
      this.snackBar.open(result.message, '', {
        duration: 5000,
      });
      this.ngOnInit();
    });
  }

  ReduceCount(cartbook: any) {
    console.log('cartbook');
    console.log(cartbook);
    let param = {
      userId: cartbook.userId,
      bookId: cartbook.bookId,
      cartId: cartbook.cartId,
    };
    this.cartService.ReduceBookCountInCart(param).subscribe((result: any) => {
      console.log(result.message);
      this.GetCart();
    });
  }

  RemoveBook(cartbook: any) {
    console.log('cartbook');
    console.log(cartbook);
    this.cartService
      .RemoveBookFromCart(cartbook.cartId)
      .subscribe((result: any) => {
        console.log(result.message);
        this.cartDetails.splice(this.cartDetails.indexOf(cartbook), 1);
        this.init.emit();
      });
  }

  GetCart() {
    this.cartService.GetCart().subscribe((result: any) => {
      this.cartDetails = result.data;
      console.log(this.cartDetails);
    });
  }

}
