import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryserService } from '../categories/services/categoryser.service';
import { RecipesserService } from './services/recipesser.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {

  constructor(private _RecipesserService: RecipesserService,
    private dialog: MatDialog,
    private _Toastr: ToastrService,
    private _CategoryserService: CategoryserService,

  ) { }

  ngOnInit(): void {
    this.getRecipesData();
    this.getTags();
    this.getCategoryTags()
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
    this.getRecipesData();
  }
  // ----------------------------------------------------
  // get all recipes data
  listData: any = {};
  searchKey: string = '';



  tagId: number = 0;
  categoryId: number = 0;

  // func to get all recipes
  getRecipesData() {

    let dataParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchKey,
      categoryId: this.categoryId,
      tagId: this.tagId,
    }

    this._RecipesserService.getAllRecipes(dataParams).subscribe({
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
  // get all tags
  listTags: any[] = [];

  getTags() {
    this._RecipesserService.getAllTags().subscribe({
      next: (resp) => {
        this.listTags = resp;
        // console.log(resp);

      },
      error: (err) => {

      }
    })
  }

  // ----------------------------------------------------
  // get all category data -tags-

  categoryList: any[] = [];

  getCategoryTags() {
    this._CategoryserService.getAllCategories({ pageSize: 1000, pageNumber: 1 }).subscribe({
      next: (resp) => {
        this.categoryList = resp.data;
      }
    })
  }



  // ----------------------------------------------------
  // open delete dialog 
  openDeleteDialog(myId: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: 'Recipe', id: myId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onDeleteRecipe(result)
      }
    });
  }


  onDeleteRecipe(id: number) {
    this._RecipesserService.deleteRecipe(id).subscribe({
      next: (resp) => {
        this.listData = resp;
        this.getRecipesData()
      }
    })
  }



}








