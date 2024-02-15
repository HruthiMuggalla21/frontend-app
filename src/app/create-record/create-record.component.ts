import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import {MatDialogContent, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatError } from '@angular/material/form-field';
import {ApiService} from '../api.service';
@Component({
  // standalone:true,
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css'],
  providers:[ApiService],
  // imports:[]
})
export class CreateRecordComponent implements OnInit{
  
  data: any;
  createForm: FormGroup;

  constructor(
    private createFormBuilder: FormBuilder, 
     private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public newData: { data: any },
    public dialogRef: MatDialogRef<CreateRecordComponent>)
    {
    this.createForm = this.createFormBuilder.group({
      sensorName: ['', Validators.required],
      description:[''],
      unit: [''],
      useInOptimization: [false],
      currentValue: [null],
      optimizedValue: [null],
      operatorLow: [null],
      operatorHigh: [null],
      status: [false]
    });
    }
  
  ngOnInit():void{
    
  }

  // openDialog(): void {
  //   this.dialog.open(this.dialogTemplate);
  // }
  

  onSaveClick(): void {
   
    if (this.createForm.valid){
      const addedData = this.createForm.value;
      this.apiService.createEntry(addedData).subscribe(
        response => {
          console.log('Record created successfully:', response);
          alert('Data added successfully!')
          // this.dialog.closeAll();
          this.dialogRef.close(addedData)
        },
        error => {
          console.error('Error creating record:', error);
        }
      );
    }
     
      
  }
 
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
  

