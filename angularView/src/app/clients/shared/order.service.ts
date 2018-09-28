import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { map } from '../../../../node_modules/rxjs-compat/operator/map';


@Injectable()
export class OrderService {
  selectedOrder: Order;
 

  constructor(private http:Http,private httpClient:HttpClient) { }
  abc;
  postOrderDetails(OrderList):Observable<any> {
    OrderList.forEach(order => {
      console.log("abhi"+order);
      var body = JSON.stringify(order);
     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
     var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
      this.abc=this.http.post('http://localhost:56225/api/OrderDetails', body, requestOptions).map(x => x.json());  

      
    });
    return this.abc;
  }
  ApiHit(order){
    
  }
  getOrderDetails():Observable<any> {
    console.log("getting order")
     return this.http.get('http://localhost:56225/api/OrderDetails').map(res => res.json());
      }
  putOrderDetails(id, OrderList) {
    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/OrderDetailss/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  deleteOrderDetails(id: number) {
    return this.http.delete('http://localhost:56225/api/OrderDetails/' + id).map(res => res.json());
  }
}
