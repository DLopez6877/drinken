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
  selectedSize: string = null;

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
    this.selectedSize = size;
    if (size === "small") {
      this.selectedSmall = true;
    } else if (size === "medium") {
      this.selectedMedium = true;
    } else {
      this.selectedLarge = true;
    }
  }

  pourDrink(ingredients){
    if (this.selectedSize != null) {
      var pumpCounter = 0;
      var multiplier = this.divide50ByTotalSum(ingredients);
      console.log('Pouring ' + this.selectedSize + ' drink. Recipe:');
      for (var i in ingredients) {
        var delay = this.calculateDuration(ingredients[i].amt, multiplier, this.selectedSize);
        var selectedPump = this.determinePump(pumpCounter);
        var querystring = '?delay=' + delay + "&selectedPump=" + selectedPump;
        this.api.pourDrink(querystring).subscribe(res => {
          console.log(res);
        });
        pumpCounter++;
        console.log(pumpCounter + ". " + ingredients[i].drink + ": " + delay + "ms");
      }
    } else {
      alert("please select a size");
    }
  }

   divide50ByTotalSum(ingredients) {
    var totalSum = 0;
    for (var i in ingredients) {
      totalSum += ingredients[i].amt;
    }
    var multiplier = 50 / totalSum;
    return multiplier;
  }

  calculateDuration(amt, multiplier, size) {
    var duration; //1 = 50seconds
    if ( size === "small") {
      duration = amt * multiplier * .5; //10 seconds total
    } else if ( size === "medium") {
      duration = amt * multiplier * .5; //25 seconds
    } else {
      duration = amt * multiplier * 1; //50 seconds
    }

    duration = duration * 1000; //convert to ms
    return duration;
  }

  determinePump(counter) {
    if (counter === 0) {
      // pump0 = new five.Led(7);
      return 'pump0';
    } else if (counter === 1) {
      // pump0 = new five.Led(6);
      return 'pump1';
    } else if (counter === 2) {
      // pump0 = new five.Led(5);
      return 'pump2';
    } else if (counter === 3) {
      // pump0 = new five.Led(4);
      return 'pump3';
    } else {
      // pump0 = new five.Led(3);
      return 'pump4';
    }
  }

}
