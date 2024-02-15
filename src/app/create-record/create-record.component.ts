import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import {ApiService} from '../api.service'
@Component({
  // standalone:true,
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css'],
  providers:[],
  // imports:[]
})
export class CreateRecordComponent implements OnInit{
  
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  createForm!: FormGroup;

  constructor(private createFormBuilder: FormBuilder, private dialog: MatDialog, private dataService: ApiService){
    
    }
  
  ngOnInit():void{
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

  openDialog(): void {
    this.dialog.open(this.dialogTemplate);
  }
  

  onSaveClick(): void {
    if (this.createForm.valid){
      this.dataService.createEntry(this.createForm.value).subscribe(
        response => {
          console.log('Record created successfully:', response);
          this.dialog.closeAll();
        },
        error => {
          console.error('Error creating record:', error);
        }
      );
    }
  }
 
  onCancelClick(): void {
    this.dialog.closeAll();
  }

  
}
