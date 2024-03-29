import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserservicesService } from 'src/app/Services/UserService/userservices.service';
import { CartservicesService } from 'src/app/Services/CartService/cartservices.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { DataservicesService } from 'src/app/Services/DataService/dataservices.service';
import { OrderservicesService } from 'src/app/Services/OrderService/orderservices.service';

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
    private data: DataservicesService,
    private order: OrderservicesService
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
    let obj = {
      cartId: cartbook.cartId,
      quantityToBuy: cartbook.quantityToBuy + 1,
    };
    this.cartService.updatecart(obj).subscribe((result: any) => {
      console.log(result.message);
      this.snackBar.open(result.message, '', {
        duration: 5000,
      });
      this.ngOnInit();
    });
  }

  ReduceCount(cartbook: any) {
    let obj = {
      cartId: cartbook.cartId,
      quantityToBuy: cartbook.quantityToBuy - 1,
    };
    if (obj.quantityToBuy == 0) {
      this.RemoveBook(cartbook);
      return;
    }
    this.cartService.updatecart(obj).subscribe((result: any) => {
      console.log(result.message);
      this.snackBar.open(result.message, '', {
        duration: 5000,
      });
      this.ngOnInit();
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

  AddToOrders() {
    this.cartDetails.forEach((element: any) => {
      let date = new Date();
      let currentDate = this.monthNames[date.getMonth()] + ' ' + date.getDate();
      let orderData = {
        UserId: parseInt(this.user.userId),
        BookId: element.bookId.bookId,
        AddressId: this.checked,
        QuantityToBuy: element.quantityToBuy,
        price: element.bookId.discountPrice,
      };
      let orderArr: any = [];
      orderArr.push(orderData)
      console.log(orderArr);
      this.order.AddToOrders(orderArr).subscribe(
        (result: any) => {
          console.log(result);
          this.orderId = result.OrderId;
          console.log(this.orderId);
          if (result.success == true) {
            this.RemoveBook(element);
            localStorage.setItem('OrderId', this.orderId);
            this.route.navigateByUrl('/orderplaced');
          }
          this.snackBar.open(result.message, '', {
            duration: 2000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, '', { duration: 2500 });
        }
      );
    });
    
  }
}
