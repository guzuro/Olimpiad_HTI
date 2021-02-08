import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  constructor(private orderService:OrderService, private activatedRoute: ActivatedRoute, private location:Location) { }

  order:any;
  id:string;

  ngOnInit(): void {
    this.getItem()
  }

  getItem(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrderById(this.id).subscribe(item => {
      this.order = item;
    })
  }


  goBack():void{
    this.location.back();
  }

  changeOrderStatus(status:string){
    console.log(status);
    
    this.orderService.changeOrderStatus(this.id, status)
  }

}
