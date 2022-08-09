import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
const MaterialComonents = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule, 
  MatDialogModule,
  MatTableModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComonents
  ],
  exports : [MaterialComonents]
})
export class MaterialModule { }
