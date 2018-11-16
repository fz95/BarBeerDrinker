import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
  barID: string;
  name: string;
  address: string;
  state: string;
 }
export interface BarMenuItem {
  name: string;
  manf: string;
  price: number;
}
export interface TopSpender {
  name: string;
  amount: number;
}

export interface TopBeer {
  name: string;
  sold: number;
}
export interface TopManf {
  manf: string;
  sold: number;
}

export interface SalesAtTime{
  hour: string,
  sales: number
}

export interface SalesOnDay{
  day: string,
  sales: number
}

@Injectable({
  providedIn: 'root'
})

export class BarsService {
  constructor(
    public http: HttpClient
  ) { }
  getBars() {
    return this.http.get<Bar[]>('/api/bars');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bars/' + bar);
  }
  
  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }
  
  getTopSpenders(barName: string){
    return this.http.get<TopSpender[]>('/api/bars/'+barName+'/topSpenders');
  }

  getTopBeers(barName: string){
    return this.http.get<TopBeer[]>('/api/bars/'+barName+'/topBeersSold');
  }

  getTopManf(barName: string){
    return this.http.get<TopManf[]>('/api/bars/'+barName+'/topManf');
  }

  getTimeDist(barName: string){
    return this.http.get<SalesAtTime[]>('/api/bars/'+barName+'/timeDist');
  }

  getDayDist(barName: string){
    return this.http.get<SalesOnDay[]>('/api/bars/'+barName+'/dayDist');
  }

 }
 