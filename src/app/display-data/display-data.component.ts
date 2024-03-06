
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
  slideToggleState: boolean = true;
  
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

  editflag:boolean=false;
    flag2:boolean=false;

    editButtonClicked(){
      this.editflag=true;
      this.flag2=!this.flag2;
    }
    cancelButtonClicked(){
      this.flag2=!this.flag2;
      this.editflag=!this.editflag

    }

    selectedRow:any=[];
    onRowClicked(row:any){
        if(this.editflag)
        {
          this.selectedRow.push(row);
          console.log("selected row is : ",this.selectedRow);
        }
        
    }

    submitClicked()
    {
      this.editflag=false;
      if(this.selectedRow)
      {
        this.updateColumn(this.selectedRow);
      }
    }

    updateColumn(arr:any){

      this.apiService.updateColumn(arr).subscribe((data)=>{
        console.log("data in subscribe is ", data); 
        console.log("before updating datasource",this.dataSource.data)

        let n = data.length;
        for(let i=0;i<n;i++)
        {
          this.updateDataSource(data[i]);
        }
        
      });
     
    }

    updateDataSource(obj:any)
    {

      if(obj)
      {
          let indexToUpdate = this.dataSource.data.findIndex(item => item.sensor_name=== obj.sensor_name);
          console.log("from update source line : obj_low and obj_high",obj.operator_low ,obj.operator_high )

          this.dataSource.data[indexToUpdate].operator_low = obj.operator_low;
          this.dataSource.data[indexToUpdate].operator_high = obj.operator_high;


          this.dataSource.data= Object.assign([], this.dataSource.data);
          console.log("After updating: datasource is ",this.dataSource.data);

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
