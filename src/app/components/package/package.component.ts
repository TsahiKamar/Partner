import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTable } from '@angular/material';
import { CustomerService } from 'src/app/services/customer.service';
import { PackageDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  @Input() tPackages:Package[]=[];

  packages: Package[] = [];

  displayedColumns: string[] = ['name','quantity','utilization'];
  
  dataSource: Package[];
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  constructor(private router: Router,private route: ActivatedRoute,private custService: CustomerService,public dialog: MatDialog) 
  { }

  ngOnInit() {
    
     this.packages = this.tPackages;

     this.dataSource = this.packages;
    
  }
  

}
