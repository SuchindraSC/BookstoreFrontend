import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserservicesService } from 'src/app/Services/UserService/userservices.service';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.scss'],
})
export class PersonaldetailsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  Password = 'this.user.password';
  @Output('init') init: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserservicesService,
    private snackBar: MatSnackBar
  ) {}

  edit = false;
  addedit = false;
  newadd = false;
  address = false;
  expand = false;
  checked: any;
  radio: string = '';
  AddressForm!: FormGroup;
  PersonForm!: FormGroup;
  userAddress: any;
  ngOnInit(): void {
    this.getAddress();
    console.log(this.user);
    (this.AddressForm = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    })),
      (this.PersonForm = new FormGroup({
        fullname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        mobile: new FormControl('', Validators.required),
      }));
    this.check();
  }
  check() {
    if (this.AddressForm.get('address')?.value == '') {
      console.log(this.AddressForm.value);
      this.newadd = true;
    }
  }
  addAddress() {
    console.log(this.AddressForm.value);
    this.userService
      .addAddress(this.AddressForm.value)
      .subscribe((result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
        this.expand = false;
        this.address = false;
        this.ngOnInit();
      });
  }

  getAddress() {
    this.userService.getAddress().subscribe((result: any) => {
      this.userAddress = result.data;
      console.log(result);
    });
  }

  editaddress(data: any) {
    console.log(this.AddressForm.value);
    this.userService
      .updateAddress(data, this.AddressForm.value)
      .subscribe((result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        });
        this.expand = false;
        this.address = false;
        this.checked = '';
        this.ngOnInit();
      });
  }

  change(data: any) {
    this.checked = data['addressId'];
    this.radio = data['type'];
    console.log(data);
  }

  // EditPersonDetail() {
  //   console.log(this.PersonForm.value);
  //   this.userService
  //     .EditPersonDetail(this.PersonForm.value)
  //     .subscribe((result: any) => {
  //       console.log(result);
  //       let obj = {
  //         emailId: this.PersonForm.value.email,
  //         fullName: this.PersonForm.value.fullname,
  //         mobileNumber: this.PersonForm.value.mobile,
  //         password: btoa(this.PersonForm.value.password),
  //         userId: this.user.userId,
  //         token: this.user.token,
  //       };
  //       localStorage.setItem('BookStoreUser', JSON.stringify(obj));
  //       this.snackBar.open(result.message, '', {
  //         duration: 3000,
  //         verticalPosition: 'bottom',
  //         horizontalPosition: 'left',
  //       });
  //       this.edit = !this.edit;
  //       this.init.emit();
  //     });
  // }
}
