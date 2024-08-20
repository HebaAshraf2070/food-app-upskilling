import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteComponent } from './delete/delete.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { CurrentUserComponent } from './current-user/current-user.component';



@NgModule({
  declarations: [
    SharedComponent,
    SidebarComponent,
    NavbarComponent,
    DeleteComponent,
    ChangePassComponent,
    CurrentUserComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    NgxDropzoneModule,
    RouterLink

  ],
  exports: [
    ReactiveFormsModule,
    SidebarComponent,
    NavbarComponent,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    NgxDropzoneModule,
    RouterLink
  ]
})
export class SharedModule { }
