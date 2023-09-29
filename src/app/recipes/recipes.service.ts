import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes:Recipe[]=[
    {
      id:'1',
      title:'biriyani',
      imageurl:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80',
      ingredients:['rice','chicken','masala']
    },
    {
      id:'2',
      title:'veg-biriyai',
      imageurl:'https://media.istockphoto.com/id/495188382/photo/indian-pulav-vegetable-rice-veg-biryani-basmati-rice.jpg?s=1024x1024&w=is&k=20&c=UfSBeQpK2Swnd6aEERRmGhi848rZd5ltqPDrfCxUQuE=',
      ingredients:['rice','vigetables']
    }
  ]


  constructor() { }

  getAllRcipes(){
    console.log(this.recipes)
    return [...this.recipes]
  }
  getRecipe(recipeId: string){
    return this.recipes.find(recipe => recipe.id == recipeId);
  }
  deleteRecipe(recipeId:string){
    this.recipes=this.recipes.filter(recipe=>{
      return recipe.id !==recipeId
    })
  }
  addRecipe(recipe: Recipe){
    console.log("working")
    this.recipes.push(recipe)
    console.log(this.recipes)
  }
}
