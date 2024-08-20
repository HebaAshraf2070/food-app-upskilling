import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedSerService } from '../services/shared-ser.service';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserComponent } from '../current-user/current-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private _Router: Router,
    private _SharedSerService: SharedSerService,
    // private dialog: MatDialog,
  ) { }

  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('role');


  logout() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/auth/login']);
  }



  // openCurrentUserDialog() {
  //   this._SharedSerService.getCurrentUser().subscribe({
  //     next: (resp) => {
  //       const dialogRef = this.dialog.open(CurrentUserComponent, {
  //         data: resp,
  //         width: '40%'
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');

  //       });
  //       console.log(resp);


  //     },
  //     error: (err) => {
  //       console.log(err);

  //     }
  //   })
  // }


  // openCurrentUserDialog(): void {

  // }
}
