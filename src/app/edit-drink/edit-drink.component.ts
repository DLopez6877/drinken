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

}
