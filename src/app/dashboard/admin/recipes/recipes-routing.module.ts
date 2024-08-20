import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';



const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'add', component: AddEditRecipeComponent },
  { path: 'edit/:id', component: AddEditRecipeComponent },
  { path: 'recipeDetails/:id', component: RecipeDetailsComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
