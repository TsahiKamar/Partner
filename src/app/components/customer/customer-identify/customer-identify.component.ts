import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-customer-identify',
  templateUrl: './customer-identify.component.html',
  styleUrls: ['./customer-identify.component.css']
})
export class CustomerIdentifyComponent implements OnInit {
  @Output() isValid: EventEmitter<boolean> = new EventEmitter();
  @Output() customerId: EventEmitter<string> = new EventEmitter();
   
  custId:string;
  message:string;

  form = new FormGroup({
    customerId: new FormControl('')
  });

  constructor(private router: Router,private route: ActivatedRoute,
    @Inject(ShareService) private shareService) { }

  ngOnInit(): void {
     
  }
  
  validation() {

 
    this.custId = this.GetControlValue(this.form,'customerId');
    this.shareService.updateMessage(this.custId);
   
    this.message = '';
    var isValid = this.customerIdValidation(this.custId); 
    this.customerId.emit(this.custId);
    
    this.isValid.emit(isValid);
    if (isValid) {
      //this.message = 'מס׳ ת.ז תקין !';
    }
    else
    {
      this.message = 'מס׳ ת.ז. אינו קיים !'
    }
  }

  addNewItem(value: string) {
    this.customerId.emit(value);
  }

//if divide by 10 without remainder than id is OK
  customerIdValidation(id) {

    id = String(id).trim();

    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
      return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);       
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
  }

  public GetControlValue(form: FormGroup, field: string){
    let el = document.querySelector('input[name="'+field+'"]');
    return form.get(field).value;
  }
 
}
