import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerIdentifyComponent } from './components/customer/customer-identify/customer-identify.component';

const routes: Routes = [
  { path: '', redirectTo : '/home',pathMatch:'full' },
  { path: 'home', component: HomeComponent},
  
  { path: 'customer', component: CustomerComponent },

  { path: 'customerIdentify', component: CustomerIdentifyComponent },

  { path: 'customers', component: CustomerComponent },
  { path: 'customerDetails', component: CustomerDetailsComponent },

  { path: 'customerDetails?id=:id', component: CustomerDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
