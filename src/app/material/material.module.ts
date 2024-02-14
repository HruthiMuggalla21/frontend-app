import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDialogModule} from '@angular/material/dialog'
// import {MatDialog,MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';


const MaterialComponents = [
  CommonModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  
  MatFormFieldModule,
  MatDialogModule,
  // MatDialog,
  // MAT_DIALOG_DATA,
  // MatDialogTitle,
  // MatDialogContent,
  MatCheckboxModule,
  MatRadioModule,
  // MatTableDataSource
]



@NgModule({
  imports: [
    [MaterialComponents]   
  ],
  exports: [MaterialComponents],
  
})
export class MaterialModule { }
