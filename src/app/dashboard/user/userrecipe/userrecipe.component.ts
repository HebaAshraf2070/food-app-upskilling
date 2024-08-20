import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CategoryserService } from '../../admin/categories/services/categoryser.service';
import { RecipesserService } from '../../admin/recipes/services/recipesser.service';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { UsrerecipeserService } from '../services/usrerecipeser.service';

@Component({
  selector: 'app-userrecipe',
  templateUrl: './userrecipe.component.html',
  styleUrls: ['./userrecipe.component.scss']
})
export class UserrecipeComponent {
  constructor(private _RecipesserService: RecipesserService,
    private dialog: MatDialog,
    private _Toastr: ToastrService,
    private _CategoryserService: CategoryserService,
    private _UsrerecipeserService: UsrerecipeserService,
  ) { }

  ngOnInit(): void {
    this.getRecipesData();
    this.getTags();
    this.getCategoryTags()
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




  // =====================================

  openView(userdata: any) {
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      data: userdata,
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.onAddToFav(result);
      }
    });
  }

  onAddToFav(id: number) {
    this._UsrerecipeserService.addtofav(id).subscribe({
      next: (resp) => {
        this._Toastr.success('item has been added to your favorite list successfully', 'success')
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
    this.getRecipesData();
  }
}







