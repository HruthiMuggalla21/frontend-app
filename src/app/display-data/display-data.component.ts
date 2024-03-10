
import { Component,ViewChild,OnInit} from '@angular/core';
import { Elements } from '../elements';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ApiService } from '../api.service';
import {cloneDeep} from 'lodash';

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
  cloned_dataSource: MatTableDataSource<Elements>=new MatTableDataSource<Elements>();


  ngOnInit(): void{
  this.apiService.getData().subscribe((dataFrom: Elements[]) => {
    this.dataSource=new MatTableDataSource<Elements>(dataFrom);
    console.log(this.dataSource.data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
    this.cloned_dataSource=cloneDeep(this.dataSource);

    
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
    submitFlag:boolean = false;


    two_way_bind:boolean=false;
    // two_way_bind:boolean=false;
    rowclick:boolean=false;
    inputcheck:boolean=true;







    editButtonClicked(){
      this.editflag=true;
      // this.flag2=!this.flag2;
      this.flag2 = true;
      this.submitFlag = true;
    }
    cancelButtonClicked(){

      this.flag2=false;
      this.editflag=!this.editflag;
      this.submitFlag = false;

      this.submitFlag=false;
      this.rowclick=false;
      

      
      this.dataSource=this.cloned_dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    }

    selectedRow:any=[];

    
    onRowClicked(row:any){

      // this.rowclick=true;
     


        if(this.editflag)
        {
          this.rowclick=true;

          let index = this.selectedRow.findIndex((sel_row: { sensor_name: string }) => sel_row.sensor_name === row.sensor_name);
         
         if(index==-1) this.selectedRow.push(row);
         else this.selectedRow.splice(index,1);


          console.log("selected row is : ",this.selectedRow);
        }

    }

    submitClicked()
    {
      // this.submitButtonClicked = false;
      this.flag2 = false;
      this.editflag=false;
      this.submitFlag = false;
      this.rowclick=false;
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
          this.selectedRow=[];

      }
      this.selectedRow=[];

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

  

  valid:boolean=false;

  onInput(value1:any,value2:any){
    this.valid=value1<value2;
    console.log('input....', typeof(value1),value1,value2);// we are getting the updated op_low and op_high;
    return this.valid;
    
  }


  test(element: any){
  let check= element.operator_low > element.operator_high;
  // this.inputcheck=!check;
   return check;
  }

  validateInput(element:any)
  { 
    console.log("current value of op_low is: ",element.operator_low)
     let check= element.operator_low > element.operator_high;
    this.inputcheck=!check;
     return this.inputcheck;

  }


}
