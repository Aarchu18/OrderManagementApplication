import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';


@Injectable()
export class OrderService {
  selectedOrder: Order;
 

  constructor(private http:Http) { }
  postOrderDetails(OrderList):Observable<any> {
    console.log(OrderList);
    debugger;
    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:56225/api/OrderDetails', body, requestOptions).map(x => x.json());
  }
  getOrderDetails():Observable<any> {
    console.log("getting order")
     return this.http.get('http://localhost:56225/api/OrderDetails')
      // .map((data: Response) => {
      //   return data.json() as Client[];
      // }).toPromise().then(x => {
      //   this.clientList = x;
      
  }
  putOrderDetails(id, OrderList) {
    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/OrderDetailss/' + id,
      body,
      requestOptions).map(res => res.json());
  }
}
