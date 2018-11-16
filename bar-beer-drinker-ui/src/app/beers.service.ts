import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopSpender } from './bars.service';


export interface Beer {
  name: string;
  manf: string;
 }

export interface BeerLocation{
  name: string,
  price: number,
  address: string
}
export interface TopBar{
  name: string,
  beerCount: number
}

export interface topDrinker{
  name: string,
  bought: number
}
export interface SoldAtTime{
  hour: string,
  sold: number
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) { }

  getBeers(){
    return this.http.get<Beer[]>('/api/beers')

  }

  getBarsSelling(beer: string){
    return this.http.get<BeerLocation[]>('/api/beers/' + beer)
  }

  getTopLocationsSold(beer: string){
    return this.http.get<TopBar[]>('/api/beers/' + beer+"/topLocations")
  }

  getTopDrinkers(beer: string){
    return this.http.get<topDrinker[]>('/api/beers/' + beer+"/topDrinkers")
  }

  getTimeDist(beer: string){
    return this.http.get<SoldAtTime[]>('/api/beers/' + beer+"/timeDist")
  }
}
