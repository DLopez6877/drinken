import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Drink } from '../drink.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss'],
  animations: [
    trigger('slideIn', [
      state('inactive', style({
        marginBottom: '-186px',
        transform: 'translateY(-220px)'
      })),
      state('active',   style({
        marginBottom: '0',
        transform: 'translateY(0px)'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ])
  ]
})
export class DrinkDetailsComponent implements OnInit {
  drinkName: string;
  drinkToDisplay: Drink;
  selectedSmall: boolean = false;
  selectedMedium: boolean = false;
  selectedLarge: boolean = false;
  selectedSize: string = null;
  ingredientsVisibility: string = 'inactive';

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

  toggleMove() {
      this.ingredientsVisibility = (this.ingredientsVisibility === 'inactive' ? 'active' : 'inactive');
  }

  setSize(size: string) {
    document.getElementById('button-animation').style.color = 'white';
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
    var buttonText = document.getElementById('button-animation');

    if (this.selectedSize != null) {
      var durations = [];
      var pumpCounter = 0;
      var multiplier = this.divide50ByTotalSum(ingredients);

      for (var i in ingredients) {
        var delay = this.calculateDuration(ingredients[i].amt, multiplier, this.selectedSize);
        durations.push(delay);
        var selectedPump = this.determinePump(pumpCounter);
        var querystring = '?delay=' + delay + "&selectedPump=" + selectedPump;
        this.api.pourDrink(querystring).subscribe(res => {
          // console.log(res);
        });
        pumpCounter++;
      }

      // button animation and console log pourTime
      var pourTime = Math.max(...durations);
      console.log('Pouring ' + this.selectedSize + ' drink. This will take about ' + Math.round(pourTime/1000) + " seconds.");

      document.getElementById('label').style.backgroundColor = "#90FFD6";
      var textCounter = 0;
      var id = setInterval(function() {
        if (textCounter === 99) {
          buttonText.innerHTML = "DRINK MADE"
          clearInterval(id);
        } else {
          textCounter++;
          buttonText.innerHTML = textCounter + '%';
        }
      }, pourTime/100);
    }

    else {
      buttonText.style.color = 'red';
      buttonText.innerHTML = "SELECT SIZE";
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
    var duration; //1 = approx 30ml
    if ( size === "small") {
      duration = amt * multiplier; //30ml
    } else if ( size === "medium") {
      duration = amt * multiplier * 4; //120ml
    } else {
      duration = amt * multiplier * 10; //300ml
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
