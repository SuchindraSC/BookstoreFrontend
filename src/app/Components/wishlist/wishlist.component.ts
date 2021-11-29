import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistservicesService } from 'src/app/Services/WishlistService/wishlistservices.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private wishList: WishlistservicesService,
    private snackBar: MatSnackBar
  ) {}
  WishList: any = [];
  ngOnInit(): void {
    this.GetWishList();
  }

  GetWishList() {
    console.log('works');
    this.wishList.GetWishList().subscribe((result: any) => {
      console.log(result);
      this.WishList = result.data;
    });
  }
  
  RemoveFromWishList(list: any) {
    console.log(list);
    this.wishList.RemoveFromWishList(list.wishlistId).subscribe(
      (result: any) => {
        if (result.success == true) {
          this.WishList.splice(this.WishList.indexOf(list), 1);
          this.ngOnInit();
        }
        this.snackBar.open(result.message, '', {
          duration: 3000,
          //verticalPosition: 'bottom',
          //horizontalPosition: 'left',
        });
        console.log(result);
      },
      (error) => {
        this.snackBar.open(`${error.error.message}`, '', {
          duration: 3000,
          //verticalPosition: 'bottom',
          //horizontalPosition: 'left',
        });
      }
    );
  }
}
