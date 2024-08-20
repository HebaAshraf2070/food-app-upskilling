import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';



@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipeComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule

  ]
})
export class RecipesModule { }
