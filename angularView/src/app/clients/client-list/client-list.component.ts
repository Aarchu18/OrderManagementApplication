import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { ItemService } from '../shared/item.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../shared/client.model';
import { Item } from '../shared/item.model';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  public clientList: any = [];

  constructor(private clientService: ClientService, private toastr: ToastrService, private orderService: OrderService, private itemService: ItemService, private routes: Router) { }

  ngOnInit() {
    this.itemService.getItemList()
      .subscribe(
        res => {
          var abc = res.json();
          console.log("aaa"+abc)
          abc.forEach((item) => {
            console.log(item)
            console.log("abc", item.itemCategory);
            this.itemID = item.itemId;
            this.itemName = item.itemName;
            this.itemCategory = item.itemCategory;
            this.itemQuantity = item.itemQuantity;
            // this.modal = new Item(this.itemID,this.itemName,this.itemCategory,this.itemQuantity);
            // this.itemdata.push(this.modal)
            this.categoryData.push({ "category": this.itemCategory, "quantity": this.itemQuantity });
          });

          // console.log(JSON.stringify(this.itemdata));
          // console.log(JSON.stringify(this.categoryData));

        }
      );

    this.clientService.getClientList().subscribe(
      clientData => {
        var cli = clientData.json();
        // console.log(cli)
        cli.forEach((client) => {
          // console.log(client.clientName);
          this.clientName = client.clientName;
          // console.log("sare" +this.clientName);
          this.clientNameList.push({ "clientName": this.clientName });
          // console.log(this.clientNameList);
        });

        // this.clientList.forEach(client=>{
        //   this.clientNameList.push(client.ClientName);
        // });
      }
    );
    this.orderService.getOrderDetails().subscribe(
      orderData => {
        var order = orderData.json();
        // console.log(order)

      }
    )

  }

  itemdata = [];
  categoryData = [];
  clientNameList = [];
  ClientName: string;
  clientName:string;
  itemCategory: string;
  itemQuantity: number;
  itemName: string;
  itemID: number;
  modal: any;
  ItemCategory: string;
  Itemname: string;
  ItemQuantity: number;
  index:number=0;
  Order: Order;
  optionSelected: any;
  client: string;
  item: string;
  message: string;
  data = [];

  public onOptionsSelected(event): void {  // event will give you full breif of action
    this.client = event.clientName;
  }
  public onOptionsItemSelected(eventItem): void {

    // console.log(eventItem);
    this.item = eventItem.category;
  }




  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    this.modal = new Item(this.itemID, this.itemName, this.itemCategory, this.itemQuantity);
    this.itemdata.push(this.modal);
    this.itemCategory = "";
    this.itemQuantity = null;
    this.itemQuantity = null;
}
counter=0
 onAdd(form: NgForm) {
   
    if (form.value.OrderId == null) {
      var data = {
        ClientName: this.client,
        ItemCategory: this.item,
        Itemname: form.controls.ItemName.value,
        ItemQuantity: form.controls.ItemQuantity.value,
        index:this.counter++,
      };
      this.toastr.success('New Record Added Succcessfully', 'Order Added');
      console.log("success" + data.ClientName)
      this.data.push(data);
      form.reset();
    }

  }
  onSave() {
    console.log("post" + this.data)
    this.orderService.postOrderDetails(this.data).subscribe(item => {
      console.log("save" + item)
      this.orderService.getOrderDetails();
      this.routes.navigate(['OrderList']);

    }, err => {
      this.message = "Employee ID Already Exists";
    }
    )
    
  }

  // deleteFieldValue(index) {
  //   this.itemdata.splice(index, 1);
  //   this.itemService.getCliID;
  //   this.itemService.Deleteitem(index);
  // }

  showForEdit(order) {
    debugger;
    console.log("working"+JSON.stringify(order))
     this.ItemQuantity=order.ItemQuantity;
      this.ClientName= order.ClientName;
      this.ItemCategory= order.ItemCategory;
     this.Itemname= order.Itemname;
    
    // this.orderService.selectedOrder = Object.assign({}, data);;
  }



  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.clientService.deleteClient(id)
        .subscribe(x => {
          this.clientService.getClientList();
          // this.toastr.warning("Deleted Successfully", "Employee Register");
        })
    }
  }

  signOut() {
    localStorage.clear();
    this.routes.navigate(['/']);

  }
}
