import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})

export class PlaceOrderComponent implements OnInit {

  customer_name: string;
  customer_lastname: string;
  recipient_name: string;
  recipient_lastname: string;
  start: string;
  end: string;
  description: string;

  constructor(private authService: AuthService, private orderService: OrderService) {}
  data: any;

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('user'))
  }

  submitForm() {
    let order: Order = {
      customer_name: this.customer_name,
      customer_lastname: this.customer_lastname,
      recipient_name: this.recipient_name,
      recipient_lastname: this.recipient_lastname,
      start: this.start,
      end: this.end,
      description: this.description,
      status: "Новый",
      user: {
        email: this.data.email,
        uid: this.data.uid
      }
    }
    this.orderService.placeOrder(order)
    // this.resetForm()
  }

  // resetForm() {
  //   this.customer_name = "";
  //   this.customer_lastname = "";
  //   this.recipient_name = "";
  //   this.recipient_lastname = "";
  //   this.start = "";
  //   this.end = "";
  //   this.description = "";
  // }

}
