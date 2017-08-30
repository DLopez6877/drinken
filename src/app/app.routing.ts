import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DrinkDetailsComponent} from './drink-details/drink-details.component';
import { WelcomeComponent} from './welcome/welcome.component';
import { EditDrinkComponent } from './edit-drink/edit-drink.component';

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
    path: 'edit-drink',
    component: EditDrinkComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
