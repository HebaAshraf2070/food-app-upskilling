import { Component } from '@angular/core';
import { UsrerecipeserService } from '../services/usrerecipeser.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent {

  constructor(
    private _UsrerecipeserService: UsrerecipeserService,
    private _Toastr: ToastrService,
  ) { }


  ngOnInit(): void {
    this.ongetallfavs()
  }




  favList: any;

  ongetallfavs() {
    this._UsrerecipeserService.ongetFav().subscribe({
      next: (resp) => {
        this.favList = resp;
      }
    })
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
    this.ongetallfavs();
  }


  deleteFav(id: number) {
    this._UsrerecipeserService.onDeleteFav(id).subscribe({
      next: (resp) => {
        this._Toastr.success('item has been deleted successfully', 'success')
        this.ongetallfavs();
      }
    })

  }
}
