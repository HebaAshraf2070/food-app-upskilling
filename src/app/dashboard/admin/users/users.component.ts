import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { UserSerService } from './services/user-ser.service';
import { ViewUserComponent } from './components/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {



  constructor(private _UserSerService: UserSerService,
    private dialog: MatDialog,
    private _Toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.getUsersData();

  }

  // ----------------------------------------------------
  // paginator ts code of angular material
  length = 50;
  pageIndex = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsersData();
  }
  // ----------------------------------------------------
  // get all user data
  listData: any = {};
  searchKey: string = '';
  groups: number | string = '';
  SelectSearch: string = '';

  getUsersData() {

    let dataParams: any = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      groups: this.groups,
    }

    if (this.SelectSearch) {
      dataParams[this.SelectSearch] = this.searchKey;
    }

    this._UserSerService.getUserData(dataParams).subscribe({
      next: (resp) => {
        this.listData = resp;
        console.log('API Response:', resp);
      },
      error: (err) => {
        console.log(err);

      }
    })



  }



  // ----------------------------------------------------
  // open delete dialog 
  openDeleteDialog(myId: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: 'User', id: myId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.DeleteDialog(result)
      }
    });
  }


  DeleteDialog(myId: number) {
    this._UserSerService.deleteUser(myId).subscribe({
      next: (resp) => {
        this._Toastr.success("Recipe has been deletd successfully", "success");
        this.getUsersData();
      }
    })

  }


  // ----------------------------------------------------
  // view user comp
  openViewUserDialog(userData: any): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: userData,
    });

  }


  ViewUserDialog(myId: number) {
    this._UserSerService.viewUser(myId).subscribe({
      next: (resp) => {
        // this._Toastr.success("Recipe has been deletd successfully", "success");
        // this.getUsersData();
      }
    })

  }



}






