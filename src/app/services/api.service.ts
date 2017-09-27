import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Drink } from '../drink.model';

@Injectable()
export class ApiService {

  baseURI: string = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  createNewDrink(newDrink: Drink) {
    return this.http.post(`${this.baseURI}/newdrink`, newDrink);
  }

  getAllDrinks() {
    return this.http.get(`${this.baseURI}/getalldrinks`);
  }

  getOneDrink(name: string) {
    return this.http.get(`${this.baseURI}/getdrink/${name}`);
  }

  deleteDrink(id: string) {
    return this.http.get(`${this.baseURI}/deletedrink/${id}`);
  }

  updateDrink(drink: any) {
    return this.http.post(`${this.baseURI}/updatedrink`, drink);
  }

  testPump() {
    return this.http.get(`${this.baseURI}/testpump`);
  }

  pourDrink(parameters: any) {
    console.log(parameters);
    return this.http.get(`${this.baseURI}/pourdrink/${parameters}`);
  }


}
