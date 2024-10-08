import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserrecipeComponent } from './userrecipe.component';

const routes: Routes = [
  { path: '', component: UserrecipeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class UserrecipeRoutingModule { }
