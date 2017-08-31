import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Drink } from '../drink.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss']
})
export class DrinkDetailsComponent implements OnInit {
  drinkName: string;
  drinkToDisplay: Drink;
  selectedSmall: boolean = false;
  selectedMedium: boolean = false;
  selectedLarge: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.drinkName = urlParameters['name'];
    });

    this.api.getOneDrink(this.drinkName).subscribe(res => {
      this.drinkToDisplay = res.json()[0];
    })

  }

  goBack() {
    window.history.back();
  }

  setSize(size: string) {
    this.selectedSmall = false;
    this.selectedMedium = false;
    this.selectedLarge = false;
    if (size === "small") {
      this.selectedSmall = true;
    } else if (size === "medium") {
      this.selectedMedium = true;
    } else {
      this.selectedLarge = true;
    }
  }

  pourDrink(){
    if (this.selectedSmall = true) {
      console.log("Pouring Small Drink")
    } else if (this.selectedMedium = true) {
      console.log("Pouring Medium Drink")
    } else {
      console.log("Pouring Large Drink")
    }
    console.log(this.drinkToDisplay);
  }

}
