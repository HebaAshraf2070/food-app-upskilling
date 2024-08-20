import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CurrentUserComponent } from 'src/app/shared/current-user/current-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'userProfile', component: CurrentUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
