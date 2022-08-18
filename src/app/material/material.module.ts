import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
const MaterialComonents = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule, 
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatCheckboxModule
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
