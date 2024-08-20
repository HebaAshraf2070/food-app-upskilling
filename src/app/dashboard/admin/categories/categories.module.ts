import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AddEditCateoryComponent } from './components/add-edit-cateory/add-edit-cateory.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCateoryComponent,
    EditCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    FormsModule

  ]
})
export class CategoriesModule { }
