import { Component, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

import { Drink } from '../drink.model';

@Component({
  selector: 'app-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.scss']
})

export class EditDrinkComponent implements OnInit {
  drinks: Array<Drink>;
  selectedDrink: any;
  previousURL: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllDrinks();
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

  getAllDrinks() {
    this.api.getAllDrinks().subscribe(res => {
      this.drinks = res.json();
      this.selectedDrink = this.drinks[0];
    });
  }

  convertAmountsToString(drinks: Drink[]) {
    var output = [];
    drinks.forEach((drink) => {
      var newIngredientArray = drink.ingredients.map((ingredient) => {
        if (ingredient) {
          ingredient.amt = ingredient.amt.toString();
          return ingredient;
        }
      });
      drink.ingredients = newIngredientArray;
      output.push(drink);
    });
    return output;
  }

  updateDrink(drinkToUpdate: Drink) {
    this.api.updateDrink(this.selectedDrink).subscribe(res => {
      // console.log(res);
    });
  }

  onChange(selectedDrink) {
    this.api.getOneDrink(selectedDrink).subscribe(res => {
      this.selectedDrink = res.json()[0];
    })
  }

  deleteDrink() {
    if(confirm("Are you sure you want to delete this Drink?")) {
      this.api.deleteDrink(this.selectedDrink.name).subscribe(res => {
        // console.log(res);
        this.getAllDrinks();
      });
    }
  }

  toString(num) {
    if (num !== null) {
      return num.toString();
    }
  }

}
