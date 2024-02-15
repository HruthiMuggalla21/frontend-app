import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import {MatDialogContent, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatError } from '@angular/material/form-field';
import {ApiService} from '../api.service';
import { Elements } from '../elements';
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


  onSaveClick(): void {
   
    if (this.createForm.valid){
      const addedData: Elements = {
        sensorName: this.createForm.value.sensorName,
        description: this.createForm.value.description,
        unit: this.createForm.value.unit,
        useInOptimization: this.createForm.value.useInOptimization,
        currentValue: this.createForm.value.currentValue,
        optimizedValue: this.createForm.value.optimizedValue,
        operatorLow: this.createForm.value.operatorLow,
        operatorHigh: this.createForm.value.operatorHigh,
        status: this.createForm.value.status
      };
      console.log(addedData)
      this.apiService.createEntry([addedData]).subscribe({
        next: (response) => {
          console.log('Record created successfully:', response);
          alert('Data added successfully!')
          this.dialogRef.close(addedData)
        },
        error: (error) => {
          console.error('Error creating record:', error);
          
        }
      });
    }    
  }
 
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
  

