import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { PackageDialogComponent } from '../package/dialog/dialog.component';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ContractsComponent implements OnInit {

  private _param: Contract[];

  public get param() : Contract[]{
      return this._param;
  }

  @Input('param')
  public set param(v : Contract[]) { 
     this._param  = v;
     this.dataSource = v;
    }

  @Output() save = new EventEmitter<Contract>();
  
  contracts: Contract[] = [];

  displayedColumns: string[] = ['memberNumber','type','firstName','lastName','packages'];
  
  dataSource: Contract[];
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  
  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,
  @Inject(ShareService) private shareService
  ) { }

 
  public showParam(newVal: Contract[] ) {
    this._param = newVal;
  }


  ngOnInit() {

   }
  
//  ngOnChanges(changes) {
//    console.log(this.param); // new value updated
//  }

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

