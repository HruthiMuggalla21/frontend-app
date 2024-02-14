
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisplayDataComponent } from './display-data/display-data.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material/material.module';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatTableModule} from '@angular/material/table';
// import {MatFormFieldModule} from '@angular/material/form-field'
// import {MatDialog,MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent, MatDialogModule} from '@angular/material/dialog'
// import {MatButtonModule} from '@angular/material/button'
// import {MatCheckboxModule} from '@angular/material/checkbox'
// import {MatRadioModule} from '@angular/material/radio';
// import { MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    DisplayDataComponent,

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRecordComponent,
    BrowserAnimationsModule,
  //   MatSlideToggleModule,
  // MatButtonModule,
  // MatToolbarModule,
  // MatIconModule,
  // MatSidenavModule,
  // MatTableModule,
  // MatDialog,

  // MatFormFieldModule,
  // MatDialogModule,

  // MatCheckboxModule,
  // MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }