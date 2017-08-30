import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  navState: boolean = false;
  loggedIn: boolean = false;
  drinks: Array<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllDrinks().subscribe(res => {
      this.drinks = res.json();
      console.log(this.drinks);
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

}
