import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  
  // data: any;
  createForm: FormGroup;

  constructor(
    private createFormBuilder: FormBuilder, 
     private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public newData: { data: any },
    public dialogRef: MatDialogRef<CreateRecordComponent>)
    {
    this.createForm = this.createFormBuilder.group({
      sensor_name: ['', Validators.required],
      description:[''],
      unit: [''],
      use_in_optimization: [false],
      current_value: [null],
      optimized_value: [null],
      operator_low: [null],
      operator_high: [null],
      status: [false]
    });
    }
  
  ngOnInit():void{
    
  }


  onSaveClick(): void {
   
    if (this.createForm.valid){
      const addedData: Elements = {
        sensor_name: this.createForm.value.sensor_name,
        description: this.createForm.value.description,
        unit: this.createForm.value.unit,
        use_in_optimization: this.createForm.value.use_in_optimization,
        current_value: this.createForm.value.current_value,
        optimized_value: this.createForm.value.optimized_value,
        operator_low: this.createForm.value.operator_low,
        operator_high: this.createForm.value.operator_high,
        status: this.createForm.value.status
      };
      console.log(addedData)
      this.apiService.createEntry(addedData).subscribe({
        next : (res) => {
          console.log(res);
          alert('Record created successfully!');
          this.dialogRef.close(addedData);
        },
        error: (error) => {
        console.error('Error creating record', error);
      }
    });
     
    }    
  }
 
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
  

