import { Component, OnInit } from '@angular/core';
import { OrderservicesService } from 'src/app/Services/OrderService/orderservices.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  OrderDetails: any;
  constructor(private orderService: OrderservicesService) {}

  ngOnInit(): void {
    this.GetOrder();
  }
  GetOrder() {
    this.orderService.GetOrder().subscribe((result: any) => {
      this.OrderDetails = result.data;
      console.log(this.OrderDetails);
    });
  }
}
