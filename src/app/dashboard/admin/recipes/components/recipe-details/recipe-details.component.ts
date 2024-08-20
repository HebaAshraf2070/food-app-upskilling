import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesserService } from '../../services/recipesser.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _RecipesserService: RecipesserService,
  ) { }

  rcipeId: number | any = "";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.rcipeId = param.get('id');
        this.viewRecipeDetails();
      }
    })
  }

  recipeDetails: any = {};

  viewRecipeDetails() {
    this._RecipesserService.viewRecipe(this.rcipeId).subscribe({
      next: (resp) => {
        console.log('recipeDetails', resp);
        this.recipeDetails = resp;
      }
    })
  }


}
