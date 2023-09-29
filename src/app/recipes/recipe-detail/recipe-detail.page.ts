
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController, IonButtons } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController,ModalController } from '@ionic/angular';
import { trigger } from '@angular/animations';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  // @ViewChild(IonModal) modal: IonModal;
  selectedValue: string[] = [];
  loadedRecipe: Recipe = {} as Recipe;
  // loadedRecipe:Recipe;
  newRecipe: Recipe = {
    id: '',
    title: '',
    imageurl: '',
    ingredients: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrls: AlertController,
    private popoc: PopoverController,
    private modalc: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes']);

        return;
      }
      const recipeId = paramMap.get('recipeId');
      console.log(recipeId);
      if (recipeId)
        this.loadedRecipe = this.recipesService.getRecipe(recipeId)!;
    });
  }
  onDeleteRecipe() {
    this.alertCtrls
      .create({
        header: 'Are you sure?',
        message: 'Do you want to delete the Recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancle',
          },
          {
            text: 'Delete',
            handler: () => {
              this.recipesService.deleteRecipe(this.loadedRecipe.id);
              this.router.navigate(['/recipes']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  addNewRecipe(id: any, tle: any, img: any) {
    this.newRecipe.id = id.value;
    this.newRecipe.title = tle.value;
    this.newRecipe.imageurl = img.value;
    this.newRecipe.ingredients = this.selectedValue;
    this.recipesService.addRecipe(this.newRecipe);
    this.modalc.dismiss()
    
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log(ev);
    if (ev.detail.role === 'confirm') {
      this.newRecipe.id = `Hello, ${ev.detail.data}!`;
    }
    // this.modal.dismiss(this.newRecipe, 'confirm');
  }
  cancel(){
    this.modalc.dismiss(null,'cancle')


}


}
