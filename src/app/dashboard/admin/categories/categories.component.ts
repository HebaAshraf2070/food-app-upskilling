import { Component, OnInit } from '@angular/core';
import { CategoryserService } from './services/categoryser.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCateoryComponent } from './components/add-edit-cateory/add-edit-cateory.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoryserService: CategoryserService,
    private dialog: MatDialog,
    private _Toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getCategoryData();


  }

  // set any default values

  listData: any = {};
  searchKey: string = '';

  getCategoryData() {
    this._CategoryserService.getAllCategories(
      { pageSize: this.pageSize, pageNumber: this.pageNumber, name: this.searchKey }).subscribe({
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
    this.getCategoryData();
  }

  // ---------------------------------------
  // open dialog func of angular material 
  // add new category

  name: string = '';


  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCateoryComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onAddCategory(result)
      }
    });
  }



  onAddCategory(data: string) {

    // let obj = {
    //   name: val;
    // }

    this._CategoryserService.addCategories(data).subscribe({
      next: (resp) => {
        this._Toastr.success('New Category has been added successfully', 'success');
        this.getCategoryData()
      },
      error: (err) => {

      }
    })
  }


  // ------------------------------------------------------------

  // open dialog of delete 


  openDeleteDialog(myId: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: 'category', id: myId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onDeleteCategory(result)
      }
    });
  }


  onDeleteCategory(id: number) {
    this._CategoryserService.deleteCategory(id).subscribe({
      next: (resp) => {
        this.listData = resp;
        this.getCategoryData()
      }
    })
  }


  // -------------------------------------
  // open edit category
  openEditDialog(myId: number, categoryName: string): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { id: myId, name: categoryName },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.editCategory(result.id, result.name)
      }
    });
  }


  editCategory(myId: number, categoryName: string) {
    this._CategoryserService.editCategor(myId, categoryName).subscribe({
      next: (resp) => {
        this.getCategoryData()
      }
    })
  }

  // ---------------------------------------------
  // view category

  openViewDialog(myId: number): void {
    this._CategoryserService.viewCategory(myId).subscribe({
      next: (resp) => {
        const dialogRef = this.dialog.open(ViewCategoryComponent, {
          data: resp,  // Pass the fetched data to the dialog
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      },
      error: (err) => {
        console.error('Error fetching category data', err);
      }
    });
  }

  // -----------------------------------------------------

}



