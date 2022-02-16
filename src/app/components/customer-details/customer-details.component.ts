import { ContractsComponent } from './../contracts/contracts.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild('appcontracts') appcontracts: ContractsComponent;
  public parentParam: Contract[];
  
  customer!:Customer; 

  @Input() tCustomerId:string = null;
  
  @Input() tAddress;
  form: FormGroup;
  id: string;
  customerId: string;
  
   constructor(private router: Router,private route: ActivatedRoute,private custService: CustomerService,private fb: FormBuilder,public dialog: MatDialog
  ,private localStorageService :LocalStorageService,
  @Inject(ShareService) private shareService
   ) {
 
   }

  ngOnInit() {

     this.shareService.currentMessage.subscribe( message => {
       this.customerId = message;
       this.customer = JSON.parse(this.localStorageService.get(this.customerId));
   
       this.form = new FormGroup({
        customerId:new FormControl({value: this.customer ? this.customer.customerId:'' , disabled: true},Validators.required),
        firstName: new FormControl({value: this.customer ? this.customer.firstName:'', disabled: true},Validators.required),
        lastName: new FormControl({value: this.customer ? this.customer.lastName:'', disabled: true},Validators.required),
        address:  this.fb.array([this.customer ? this.initAddress(this.customer.address) : this.initEmptyAddress() ]),
        contracts: this.fb.array(this.customer ? this.createContractsCtrl(this.customer.contracts) : [])
       });

       this.updateContacts();
   
    })

}

public updateContacts()
{
  this.parentParam = this.form.get('contracts').value; 
}

 initAddress(data) {
   return this.fb.group({
    city: [data.city],
    street: [data.street],
    houseNum: [data.houseNum],
    zipCode: [data.zipCode]
});
}

initEmptyAddress() {
  return this.fb.group({
   city: [''],
   street: [''],
   houseNum: [''],
   zipCode: ['']
});
}


get address() {
  return this.form.controls["address"] as FormArray;
}

get contracts() {
  return this.form.controls["contracts"] as FormArray;
}

    
  save() {
  var request = this.form.getRawValue();
  request.address = request.address[0];

  this.custService.updateCustomerDetails(request).subscribe(result => {
     console.log("updateCustomerDetails result : " + result );
    
   },
   error => {
       alert("updateCustomerDetails error : " + error);
   },
   () => {
       // No errors
   }
   );

}
 

get addressControls(){

  return (<FormArray>this.form.get('address')).controls
}
get contractsControls(){

  return (<FormArray>this.form.get('contracts')).controls
}

public GetControlValue(form: FormGroup, field: string){
  let el = document.querySelector('input[name="'+field+'"]');
  return form.get(field).value;
}

changeCustomer(){
  this.form.reset();
       
  location.reload();
 
}

createContractsCtrl(data) {
    const formArray = [];
 
    for(let contract of data){
      formArray.push(
        this.fb.group({
          memberNumber: [contract.memberNumber],
          type:[contract.type],
          firstName: [contract.firstName],
          lastName: [contract.lastName],
          packages: this.fb.array(this.createPackagesCtrl(contract))
       })
     );
    }
   return formArray;
  }


createPackagesCtrl(contract) {
  const formArray = [];
  if (contract.packages)
  {
  for(let p of contract.packages){
    formArray.push(
      this.fb.group({
        name: [p.name],
        type:[p.type],
        quantity: [p.quantity],
        utilization: [p.utilization]
    })
   );
  }
   return formArray;

}
  

}


}
