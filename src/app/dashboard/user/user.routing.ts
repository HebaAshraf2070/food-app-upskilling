import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {

    path: '', component: UserComponent,
    children: [
      { path: 'favs', loadChildren: () => import('./favs/favs.module').then(c => c.FavsModule) },
      { path: 'userrecipe', loadChildren: () => import('./userrecipe/userrecipe.module').then(c => c.UserrecipeModule) }

    ]
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})


export class UserRoutingModule { }