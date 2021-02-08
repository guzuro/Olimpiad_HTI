import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

// в компоненты хранятся все заказы, здесь же они фильтруются и передаются дочернему компоненту списка
export class AdminDashboardComponent implements OnInit {

  constructor(private orderService:OrderService, private router: Router, private route:ActivatedRoute) { }
  
  userData: any;
  userRole: string;
  orderList:any[];
  filterArr:any[];
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.userRole = localStorage.getItem('role')
    this.getOrders();

    setTimeout(() => {
      if(this.userRole=='Менеджер'){
        document.getElementById("Все").click()
      } if(this.userRole == 'Склад'){
        document.getElementById("Комплектуется").click()
      } if(this.userRole == 'Курьер'){
        document.getElementById("Вработе").click()
      }
    },1000); 
  }
  
  getOrders() {
    let all = this.orderService.getAllOrdersId().subscribe(items => {
      this.orderList = items
      if (this.route.snapshot.fragment) {
        document.getElementById(this.route.snapshot.fragment).click()
      }
    })
  }

  currentCategory: string;
  changeFilter(filter) {
    this.currentCategory = filter;
    if (filter == "Все") {
      this.filterArr = this.orderList;
    } else {
      let sub = this.orderService.getOrdersByStatus(filter).subscribe(items=>{
        this.filterArr = items;
        if (this.route.snapshot.fragment) {
          document.getElementById(this.route.snapshot.fragment).click()
        }
      })
   }
  }


trackByItems(index: number, order: Order): string { return order.id; }

}
