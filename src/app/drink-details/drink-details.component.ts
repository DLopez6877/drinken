import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Drink } from '../drink.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss']
})
export class DrinkDetailsComponent implements OnInit {
  drinkName;
  drinkToDisplay: Drink;

  constructor(private api: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.drinkName = urlParameters['name'];
    });

    this.api.getOneDrink(this.drinkName).subscribe(res => {
      this.drinkToDisplay = res.json()[0];
    })

  }

}
