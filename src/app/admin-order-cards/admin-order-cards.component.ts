import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-order-cards',
  templateUrl: './admin-order-cards.component.html',
  styleUrls: ['./admin-order-cards.component.css']
})
export class AdminOrderCardsComponent implements OnInit {
  @Input() order: {
    id:string;
    order:Order;
  };

  constructor(public authService:AuthService, private orderService:OrderService) { }

  ngOnInit(): void {
  }
  changeStatus(id, newStatus){
    this.orderService.changeOrderStatus(id, newStatus);
  }
}
