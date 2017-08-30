import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DrinkDetailsComponent} from './drink-details/drink-details.component';
import { WelcomeComponent} from './welcome/welcome.component';
import { EditDrinkComponent } from './edit-drink/edit-drink.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'drink-details',
    component: DrinkDetailsComponent
  },
  {
    path: 'add-drink',
    component: AddDrinkComponent
  },
  {
    path: 'edit-drink',
    component: EditDrinkComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
