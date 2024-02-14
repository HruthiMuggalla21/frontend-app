import { Component } from '@angular/core';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@Component({
  standalone:true,
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css'],
  providers:[],
  imports:[]
})
export class CreateRecordComponent {
  createForm: FormGroup;

  constructor(private createFormBuilder: FormBuilder){
    this.createForm = this.createFormBuilder.group({

    })
  }
  createEntry(){}
}
