import { Component, OnInit } from '@angular/core';
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
    for(var i = 1; i <= number; i++){
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

  updateDrink(drinkToUpdate: Drink) {
    // this.api.updateDrink(drinkToUpdate.$_id).subscribe(res => {
    //   console.log(res);
    // });
    console.log('working?');
  }

  onChange(selectedDrink) {
    this.api.getOneDrink(selectedDrink).subscribe(res => {
      this.selectedDrink = res.json()[0];
      console.log(this.selectedDrink);
    })
  }

  deleteDrink() {
    if(confirm("Are you sure you want to delete this Drink?")) {
      this.api.deleteDrink(this.selectedDrink.name).subscribe(res => {
        console.log(res);
        this.getAllDrinks();
      });
    }
    console.log(this.selectedDrink);
  }

  goBack() {
    window.history.back();
  }

}
