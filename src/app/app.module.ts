
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisplayDataComponent } from './display-data/display-data.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
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
    DisplayDataComponent,
    CreateRecordComponent
    
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }