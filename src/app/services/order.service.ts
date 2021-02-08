import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Order } from '../models/order';

import firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCollectionRef: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(private afs:AngularFirestore) {
    this.orderCollectionRef = this.afs.collection('orders');
    this.orders = this.orderCollectionRef.snapshotChanges().pipe(
      map(data => data.map(a=>{
        const data =  a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    ))
  }

  getAllOrdersId() {
    return this.orders

  }

  placeOrder(order:Order){
    this.afs.collection('orders').add({
      order
    }).then(response=>{
      this.afs.collection('users').doc(order.user.uid).update({
        orders: firebase.firestore.FieldValue.arrayUnion(response.id)
      })
    })
  }

  getUserOrdersList(userId: string):Observable<User>{
    const userDoc = this.afs.doc(`users/${userId}`);
    const userData$ = userDoc.snapshotChanges().pipe(
      map(data => {
        return data.payload.data() as User
      }),
    );
    return userData$;
  }

  getOrderById(id):Observable<Order> {
    const orderDoc = this.afs.doc(`orders/${id}`);
    const orderData$ = orderDoc.snapshotChanges().pipe(
      map(data => {
        return data.payload.data() as any
      }),
    );
    return orderData$;
  }

  changeOrderStatus(orderId, newStatus){
    this.afs.collection('orders').doc(orderId).update({
    "order.status" :newStatus
    })
  }

  getOrdersByStatus(stat) {
    const collectionRef = this.afs.collection("orders", orders=> orders.where('order.status', '==', stat))
    const resultDocuments$ = collectionRef.snapshotChanges().pipe(
      map(data=>data.map(a=>{
        const id = a.payload.doc.id;
        return{...a.payload.doc.data() as Order, id}
      }))
    )
    return resultDocuments$
  }


  docChanges(id):any{
    return this.afs.doc(`orders/${id}`).snapshotChanges().pipe(
      map(doc=>{
        const data = doc.payload.data() as Order;
        const id = doc.payload.id;
        return {...data, id}
      })
    )
  }
}


