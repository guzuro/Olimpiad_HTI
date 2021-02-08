import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(private orderService:OrderService, private authServices:AuthService, private router:Router) { }

  ordersId:any[];

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('user'))
    const id = data.uid;
    this.getOrders(id);
  }

  getOrders(id) {
    this.orderService.getUserOrdersList(id).subscribe(data => {
      this.ordersId = data.orders
    })
  }

  openItem(orderId){
    this.router.navigate([`user/my-orders/order/${orderId}`]);
  }

  }
