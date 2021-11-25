import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserservicesService } from 'src/app/Services/UserService/userservices.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  hide = false;
  token: any;

  constructor(
    private userService: UserservicesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  ResetPassword() {
    console.log(this.ResetPasswordForm.value.OTP);
    if (!this.ResetPasswordForm.invalid) {
      console.log('Register method');
      this.userService
        .ResetPassword(this.ResetPasswordForm.value, this.token)
        .subscribe(
          (status: any) => {
            console.log(status);
            if (status.success == true) {
              this.snackBar.open(status.message, '', { duration: 2000 });
              this.router.navigateByUrl('/login');
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error.error.message);
            this.snackBar.open(error.error.message, '', { duration: 2000 });
            if (error.error.message == 'Reset Unsuccessfull!') {
              this.router.navigateByUrl('/login');
            }
          }
        );
    }
  }
}
