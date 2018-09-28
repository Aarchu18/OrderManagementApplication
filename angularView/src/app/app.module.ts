import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ItemService } from './clients/shared/item.service';
import { AppComponent } from './app.component';
import  {ClientService} from './clients/shared/client.service';
import {OrderService} from './clients/shared/order.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientComponent } from './clients/client/client.component';
import{Routes,RouterModule} from '@angular/router';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';

//import { ToastrModule } from 'ngx-toastr';

const routes:Routes=[{
  path:'',
  component:ClientComponent
},
{
  path:'List',
  component:ClientListComponent,
  //canActivate:[AuthguardService]

},


]
@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientListComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
   // ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService,ItemService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
