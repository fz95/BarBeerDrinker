import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeersComponent } from './beers/beers.component';
import { InsightComponent } from './insight/insight.component';
import { DrinkersComponent } from './drinkers/drinkers.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { BarsComponent } from './bars/bars.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ModifyComponent } from './modify/modify.component';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BarDetailsComponent,
    BeerDetailsComponent,
    BeersComponent,
    InsightComponent,
    DrinkersComponent,
    DrinkerDetailsComponent,
    BarsComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    PaginatorModule,
    InputTextModule,
    TabViewModule,
    TabMenuModule,
    PanelMenuModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
