import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService :OrderService,private toastr: ToastrService) { }
orderList=[];
  ngOnInit() {
 
    this.orderService.getOrderDetails().subscribe(order =>
    {
      this.orderList=order;
      console.log(JSON.stringify(this.orderList))
      // var abc = JSON.stringify(order);
      // console.log(abc)
   // this.orderList.push(abc);
    //console.log(this.orderList);
     
    });
  }
  onDelete(id: number){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrderDetails(id)
        .subscribe(x => {
          this.orderService.getOrderDetails();
           this.toastr.warning("Deleted Successfully");
        })
    }

  }

}
