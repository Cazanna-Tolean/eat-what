import { Injectable } from '@angular/core';
import { IMeals } from '../data/mealProp'; 
import { mockMeals } from '../data/mockData';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  resultMeals!: IMeals[];
  constructor() { }
  takeMeals() {
    try {
      // todo - call API
      throw new Error("haven't done"); // trigger syntax error
    } catch (e) {
      this.resultMeals = mockMeals;
    }
    return this.resultMeals;
  }
}
