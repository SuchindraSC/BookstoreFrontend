import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserservicesService } from 'src/app/Services/UserService/userservices.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  ForgotPasswordForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private userService: UserservicesService
  ) {}

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  ForgotPassword() {
    if (!this.ForgotPasswordForm.invalid) {
      console.log('Register method');
      this.userService.ForgotPassword(this.ForgotPasswordForm.value).subscribe(
        (result: any) => {
          if (result.success == true) {
            this.snackBar.open(result.message, '', { duration: 3000 });
            this.route.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.snackBar.open(error.error.message, '', { duration: 3000 });
          if (error.error.message == 'Email not Sent') {
            this.route.navigateByUrl('/login');
          }
        }
      );
    }
  }
}
