import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { PackageDialogComponent } from '../package/dialog/dialog.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ContractsComponent implements OnInit {

@Input() tContracts:Contract[]=[];
 
@Output() save = new EventEmitter<Contract>();
  
  contracts: Contract[] = [];

  displayedColumns: string[] = ['memberNumber','type','firstName','lastName','packages'];//and packages
  
  dataSource: Contract[];
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  
  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = null;
    this.contracts = [];
    this.contracts = this.tContracts;
  
    this.dataSource = this.contracts;
   }

 
  onRowClicked(row) {
    
  }

 
openDialog(data) {
  const dialogRef = this.dialog.open(PackageDialogComponent, {
    width: '600px',
    data: data,
    autoFocus: false
  });

  dialogRef.afterClosed().subscribe(result => {
  });
}



}

