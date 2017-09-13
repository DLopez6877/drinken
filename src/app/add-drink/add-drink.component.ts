import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { Drink } from '../drink.model';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})
export class AddDrinkComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllDrinks().subscribe(res => {
      console.log(res.json());
    });
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  createDrink(form: NgForm) {
    var ingredients = [
      {drink: form.value.ingredient1, amt:form.value.amt1},
      {drink: form.value.ingredient2, amt:form.value.amt2},
      {drink: form.value.ingredient3, amt:form.value.amt3},
      {drink: form.value.ingredient4, amt:form.value.amt4},
      {drink: form.value.ingredient5, amt:form.value.amt5},
    ];
    
    var newDrink = new Drink(form.value.name, form.value.img, ingredients);
    this.api.createNewDrink(newDrink).subscribe((res) => {
      console.log(res);
    });
  }

  getOneDrink(form: NgForm) {
    this.api.getOneDrink(form.value.id).subscribe(res => {
      console.log(res);
    })
  }

  goBack() {
    window.history.back();
  }

}
