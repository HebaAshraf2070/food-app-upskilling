import { SharedSerService } from './../services/shared-ser.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserService } from 'src/app/auth/services/authser.service';
import { ChangePassComponent } from '../change-pass/change-pass.component';
import { ToastrService } from 'ngx-toastr';


// interface
interface IMenu {
  text: string,
  icon: string,
  link: string,
  isActive: boolean,
}



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private _AuthserService: AuthserService,
    private _Router: Router,
    private dialog: MatDialog,
    private _SharedSerService: SharedSerService,
    private _Toastr: ToastrService,
  ) { };


  isAdmin(): boolean {
    return this._AuthserService.role == 'SuperAdmin' ? true : false
  }


  isUser(): boolean {
    return this._AuthserService.role == "SystemUser" ? true : false
  }




  menuLinks: IMenu[] = [
    {
      text: 'Home',
      icon: 'fa-solid fa-home',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      text: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      text: 'Recipes',
      icon: 'fa-solid fa-bowl-rice',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      text: 'Categories',
      icon: 'fa-solid fa-layer-group',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      text: 'Favs',
      icon: 'fa-solid fa-heart',
      link: '/dashboard/user/favs',
      isActive: this.isUser(),
    },
    {
      text: 'User Recipes',
      icon: 'fa-solid fa-utensils',
      link: '/dashboard/user/userrecipe',
      isActive: this.isUser(),
    },


  ]

  // ======================================
  // change pass dialog 


  openViewDialog(): void {

    const dialogRef = this.dialog.open(ChangePassComponent, {
      data: {},  // Pass the fetched data to the dialog
    });


  }



}












