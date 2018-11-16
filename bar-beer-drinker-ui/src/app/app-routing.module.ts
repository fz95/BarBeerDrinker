import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { InsightComponent } from './insight/insight.component';
import { DrinkersComponent } from './drinkers/drinkers.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { BeersComponent } from './beers/beers.component';
import { BarsComponent } from './bars/bars.component';
import { ModifyComponent } from './modify/modify.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'bars',
    pathMatch: 'full',
    component: BarsComponent
  },
  {
    path: 'bars/:bar',
    pathMatch: 'full',
    component: BarDetailsComponent
    },
  {
    path: 'beers',
    pathMatch: 'full',
    component: BeersComponent

  },
  {
    path: 'beers/:beer',
    pathMatch: 'full',
    component: BeerDetailsComponent

  },
  {
    path: 'drinkers',
    pathMatch: 'full',
    component: DrinkersComponent

  },
  {
    path: 'drinkers/:drinker',
    pathMatch: 'full',
    component: DrinkerDetailsComponent
  },
 
  {
    path: 'drinkerInfo/:drinker',
    pathMatch: 'full',
    component: DrinkerDetailsComponent

  },
  {
    path: 'insight',
    pathMatch: 'full',
    component: InsightComponent

  },
  {
    path: 'transactions/:id',
    pathMatch: 'full',
    component: DrinkerDetailsComponent
  },
  {
    path: 'modify',
    pathMatch: 'full',
    component: ModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
