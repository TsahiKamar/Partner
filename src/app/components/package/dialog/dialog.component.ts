import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTable} from "@angular/material";

export interface UsersData {} 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class PackageDialogComponent implements OnInit {

    displayedColumns: string[] = ['name','type','quantity','utilization'];

  
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

     action:string;
     local_data:any;
     //packages:Package[];
  
    constructor(
        private dialogRef: MatDialogRef<PackageDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data:Package[]) {
      }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close({event:'Cancel'});
    }

    onRowClicked(row){

    }
}




  
