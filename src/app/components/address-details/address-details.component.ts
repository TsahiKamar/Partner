import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { AddressDialogComponent } from '../address/dialog/dialog.component';
//import {Address} from '../address-details/address.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddressDetailsComponent implements OnInit {

  @Input('group')
  public form: FormGroup;

  dialogData!: any;  
  
  address: Address;
  f: FormGroup;
  
    constructor(private router: Router,private route: ActivatedRoute,private custService: CustomerService,public dialog: MatDialog) { 
  
    }
  
    ngOnInit() {
  
         this.f = new FormGroup({
          city: new FormControl({value: '' , disabled: true}),
          street:new FormControl({value: '' , disabled: true}),
          houseNum:new FormControl({value: undefined , disabled: true}),
          zipCode: new FormControl({value: undefined , disabled: true})
        });
        
        this.f.patchValue(
        {
            ...this.form
        }
        );
   }
     
  
    
  public GetControlValue(form: FormGroup, field: string){
    let el = document.querySelector('input[name="'+field+'"]');
    return form.get(field).value;
  }
  

  openDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '250px',
      data: this.form.value,
      autoFocus: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.dialogData = result.data;
        
        this.form.patchValue(
           {
             ...this.dialogData
           }
        );

     });
  }
  
 

  
  }
  