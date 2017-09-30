import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { Drink } from '../drink.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  navState: boolean = false;
  loggedIn: boolean = false;
  drinks: Drink[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getAllDrinks().subscribe(res => {
      this.drinks = res.json();
    });
  }

  toggleNavState() {
    this.navState = !this.navState;
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  goToDetailPage(clickedDrink: Drink) {
     this.router.navigate(['drink', clickedDrink.name]);
   };

}
