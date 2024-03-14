import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, Validators,FormBuilder, ValidatorFn} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../api.service';
import { Elements } from '../elements';



@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css'],
  providers:[ApiService],
})



export class CreateRecordComponent implements OnInit{
  
  createForm: FormGroup;
   

  constructor(
    private createFormBuilder: FormBuilder, 
     private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public newData: { data: any },
    public dialogRef: MatDialogRef<CreateRecordComponent>)
    {
    this.createForm = this.createFormBuilder.group({
      sensor_name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z0-9_]*')]],
      description:['', this.textValidator()],
      unit: [''],
      use_in_optimization: [false],
      current_value: [null],
      optimized_value: ['',Validators.required],
      operator_low: ['', Validators.required],
      operator_high: ['', Validators.required],

      status: [false]
    },{
      validators:this.customValidator.bind(this)});

    
    }

    textValidator(){
      return (control:AbstractControl):ValidationErrors | null => {
        const value=control.value;
        if(value && value.trim() ==='') {
          return {required:true};
        }
        if(/^\d+$/.test(value)){
          return {numericOnly:true};
        }
        return null;
      }
    }

    customValidator(group: FormGroup) {
      const operator_low = group.get('operator_low')?.value;
      const operator_high = group.get('operator_high')?.value;

      const optimized_value = group.get('optimized_value')?.value;

      if ( operator_low > operator_high) {
        group.get('operator_high')?.setErrors({ 'invalidRange': true });
      }else {
        group.get('operator_high')?.setErrors(null);
      }
   
      
      if ( operator_high!=null && operator_low!=null && (optimized_value < operator_low || optimized_value > operator_high)) {
        group.get('optimized_value')?.setErrors({ 'invalidRange': true });
      } else {
        group.get('optimized_value')?.setErrors(null);
      }
   
      return null;
    }
  
  ngOnInit():void{
    
  }


  onSaveClick(): void {
   
    if (this.createForm.valid){
      const addedData: Elements = {
        sensor_id:this.createForm.value.sensor_id,
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
  

