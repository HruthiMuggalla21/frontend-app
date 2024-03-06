
import { Component,ViewChild,OnInit} from '@angular/core';
import { Elements } from '../elements';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ApiService } from '../api.service';

// import { MaterialModule } from '../material/material.module';


@Component({
  // standalone:true,
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
  // imports:[ MatPaginatorModule, MatSortModule]
})


export class DisplayDataComponent implements OnInit {
  title = 'materialApp';
  color='grey';
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private apiService: ApiService){}

  dataSource: MatTableDataSource<Elements>=new MatTableDataSource<Elements>();

  ngOnInit(): void{
  this.apiService.getData().subscribe((dataFrom: Elements[]) => {
    this.dataSource=new MatTableDataSource<Elements>(dataFrom);
    console.log(this.dataSource.data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
    },(error:MatSort)=>{
      throw error;
    }

  );
 
  }

  displayedColumns: string[] = ['sensor_name', 'description', 'unit','use_in_optimization','current_value',
  'optimized_value','operator_low','operator_high','status'];
 
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  index:number=0;

  getRowStyle(element: Elements):any{
    
    return {
      'background-color': element.use_in_optimization? 'white': 'grey'
    }
  }
  openCreateDialog() {
    console.log('open dialog called')
    const dialogRef = this.dialog.open(CreateRecordComponent, 
      {
      width: '500px',
      // panelClass: 'my-custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Data successfully added',result);
      }
    })  
    
  };
  updateData(){

  }

  
}
