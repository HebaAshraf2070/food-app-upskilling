import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { FavsModule } from './favs/favs.module';
import { UserrecipeModule } from './userrecipe/userrecipe.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FavsModule,
    UserrecipeModule

  ]
})
export class UserModule { }
