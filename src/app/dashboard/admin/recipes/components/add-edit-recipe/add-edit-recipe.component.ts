import { Component, OnInit } from '@angular/core';
import { RecipesserService } from '../../services/recipesser.service';
import { CategoryserService } from '../../../categories/services/categoryser.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  constructor(private _RecipesserService: RecipesserService,
    private _CategoryserService: CategoryserService,
    private _Toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
  ) {
    this.itemId = this._ActivatedRoute.snapshot.params['id'];
    if (this.itemId) {
      this.getRecipedbyId(this.itemId);
    }

  }


  ngOnInit(): void {
    this.getTags();
    this.getCategoryTags();
  }

  // ============================================
  // dropzone to upload img in form of file
  files: File[] = [];
  imgSrc: any = '';

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    // var 
    this.imgSrc = this.files[0];

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



  // ============================================
  // Define the form with correct control names
  recipesForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    price: new FormControl(null),
    description: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(),
    recipeImage: new FormControl(null),
  });

  onAddRecipe(recipesForm: FormGroup) {
    let myFormData = new FormData();

    myFormData.append('name', recipesForm.value.name);
    myFormData.append('price', recipesForm.value.price);
    myFormData.append('description', recipesForm.value.description);
    myFormData.append('tagId', recipesForm.value.tagId);
    myFormData.append('categoriesIds', recipesForm.value.categoriesIds)
    myFormData.append('recipeImage', this.imgSrc);

    if (this.itemId) {
      this._RecipesserService.editRecipebyId(this.itemId, myFormData).subscribe({
        next: (resp) => {

        }
      })
    } else {
      this._RecipesserService.addRecipe(myFormData).subscribe({
        next: (resp) => {
          // console.log('Recipe added successfully:', resp);
          this._Toastr.success('Your recipe has been added successfully', 'success');
          this.recipesForm.reset();
          this.files = [];
        },
        error: (err) => {
          console.error('Error adding recipe:', err);
        },
      });
    }

  }


  // ============================================
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

  // ============================================
  //  get all categories

  categoryList: any[] = [];

  getCategoryTags() {
    this._CategoryserService.getAllCategories({ pageSize: 1000, pageNumber: 1 }).subscribe({
      next: (resp) => {
        this.categoryList = resp.data;
      }
    })
  }


  // ============================================
  //  edit recipe 

  itemId: number = 0;
  itemData: any = '';
  getRecipedbyId(id: number) {
    this._RecipesserService.getRecipebyId(id).subscribe({
      next: (resp) => {
        this.itemData = resp;
        console.log(resp);

      },
      error: (err) => {

      },
      complete: () => {
        this.recipesForm.patchValue({
          name: this.itemData.name,
          price: this.itemData.price,
          description: this.itemData.description,
          categoriesIds: this.itemData.category.map((c: any) => c.id),
          tagId: this.itemData.tag.id,
          imagePath: this.itemData.imagePath,
        })
      }
    })
  }

}
