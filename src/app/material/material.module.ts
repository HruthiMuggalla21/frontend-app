import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatError} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const MaterialComponents = [
  CommonModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  
  MatDialogModule,
  
  MatCheckboxModule,
  MatRadioModule,
  MatPaginatorModule, 
  FontAwesomeModule
];

@NgModule({
  imports: [...MaterialComponents],
  exports: [...MaterialComponents],
})
export class MaterialModule {}
