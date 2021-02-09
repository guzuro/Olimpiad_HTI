import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

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
  isAll:boolean;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.userRole = localStorage.getItem('role')
    this.getOrders();
    this.isAll = true;

    setTimeout(() => {
      if(this.userRole=='Менеджер'){
        document.getElementById("Все").click()
      } if(this.userRole == 'Склад'){
        document.getElementById("Комплектуется").click()
      } if(this.userRole == 'Курьер'){
        document.getElementById("Вработе").click()
      }
    },1500); 
  }
  
  getOrders() {
    let all = this.orderService.getAllOrdersId().subscribe(items => {
      this.orderList = items;
    })
  }

  currentCategory: string;
  changeFilter(filter) {
    console.log(filter);
    this.currentCategory = filter;
    if (filter == "Все") {
      this.isAll = true;
      this.filterArr = this.orderList;

    } else {
      this.isAll = false;
      let sub = this.orderService.getOrdersByStatus(filter).subscribe(items=>{
        this.filterArr = items;
        sub.unsubscribe()
      })
   }
  }


trackByItems(index: number, order: Order): string { return order.id; }

}
