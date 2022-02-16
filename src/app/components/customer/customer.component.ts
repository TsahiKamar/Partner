import { CustomerDetailsComponent } from './../customer-details/customer-details.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  isCustomerValid:boolean = false;//Init
  customerId!:string;
  customer: Customer;

  form = new FormGroup({
    customerId: new FormControl('')
  });
  
  constructor(private router: Router,private route: ActivatedRoute,private custService: CustomerService,private localStorageService :LocalStorageService
    ) { }

  ngOnInit() {
      
  }

  onCustomerValidation(event){
    this.isCustomerValid = event;
    if(this.isCustomerValid){
     
      this.getCustomerDetails(this.customerId);
    }
  }
  
  getId(event:string){
    this.customerId = event;
  }
 
  
  getCustomerDetails(customerId: string){

    this.custService.getCustomerDetails(customerId).subscribe(result => {
      this.customer = result;
      this.localStorageService.set(customerId,JSON.stringify(this.customer));

      const Timeout = setTimeout(this.timeout, 300000);//5000
     },
    error => {

      alert("getCustomerDetails error : " + JSON.stringify(error));

    },
    () => {
        // 'onCompleted' callback.
        // No errors
    }
    );


  }

  public timeout(){
    location.reload();
  }

  public GetControlValue(form: FormGroup, field: string){
    let el = document.querySelector('input[name="'+field+'"]');
    return form.get(field).value;
  }
  


}
