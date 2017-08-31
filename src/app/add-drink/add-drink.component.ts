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

  createDrink(form: NgForm) {
    var newDrink = new Drink(form.value.name, form.value.img, [form.value.ingredients]);
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
