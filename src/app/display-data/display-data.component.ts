
import { Component,ViewChild,OnInit} from '@angular/core';
import { Elements } from '../elements';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ApiService } from '../api.service';
import {cloneDeep} from 'lodash';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
    console.log("DS at t=0 ",this.dataSource.data);
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

    rowclick:boolean=false;
    inputcheck:boolean=true;


    editButtonClicked(){
      this.editflag=true;
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

        if(this.editflag)
        {
          this.rowclick=true;
          this.selectedRow.push(row);

        //   let index = this.selectedRow.findIndex((sel_row: { sensor_name: string }) => sel_row.sensor_name === row.sensor_name);
         
        //  if(index==-1) this.selectedRow.push(row);
        //  else this.selectedRow.splice(index,1);


          console.log("selected row is : ",this.selectedRow);
        }

    }

    submitClicked()
    {
      console.log('submit called and curr val in selected row is ',this.selectedRow); 
      
      // this.submitButtonClicked = false;
      this.flag2 = false;
      this.editflag=false;
      this.submitFlag = false;
      this.rowclick=false;
      if(this.selectedRow)
      {
        console.log('updateColumn from submit called and selected row is ',this.selectedRow); 
        
        this.updateColumn(this.selectedRow);
      }

    

      this.dataSource.sort = this.sort;


      console.log('DS after submit clicked ', this.dataSource.data);
      

    }

    updateColumn(arr:any){

      console.log('org updataColumn called with array ',arr); 
      

      this.apiService.updateColumn(arr).subscribe((data)=>{
        console.log("data in subscribe of updateColumn is ", data); 

        let n = data.length;
        for(let i=0;i<n;i++)
        {
          console.log('updateDataSource called from updateColumn');
          
          this.updateDataSource(data[i]);
        }

        console.log('update ds skipped');
        
        
      });
     
    }

    updateDataSource(obj:any)
    {
      console.log('updateDatasource is called');


      if(obj)
      {
          let indexToUpdate = this.dataSource.data.findIndex(item => item.sensor_name=== obj.sensor_name);
         
          console.log("before updating ds ",this.dataSource.data);

          this.dataSource.data[indexToUpdate].operator_low = obj.operator_low;
          this.dataSource.data[indexToUpdate].operator_high = obj.operator_high;


          
          this.dataSource.data= Object.assign([], this.dataSource.data);


          console.log("After updating: datasource is ",this.dataSource.data);
          this.selectedRow=[];

      }
      this.selectedRow=[];

    }
   
    onToggleChange(element:any, event:MatSlideToggleChange) {
      element.use_in_optimization = event.checked;
    }
   
    

  openCreateDialog() {
    console.log('open dialog called')
    const dialogRef = this.dialog.open(CreateRecordComponent, 
      {
      width: '400px',
      // panelClass: 'my-custom-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Data successfully added',result);

        this.dataSource.data.push(result);
        this.dataSource.data= Object.assign([], this.dataSource.data);
        console.log('ds after dialog closed',this.dataSource.data);

      }
    })  
    
  };


  valid:boolean=false;

  test(element: any){
  let check= element.operator_low > element.operator_high;
  
   return check;
   
  }

  

  validateInput(element:any)
  { 

    let check= (element.operator_low > element.operator_high);
    this.inputcheck=!check;
     return this.inputcheck;

  }


}
