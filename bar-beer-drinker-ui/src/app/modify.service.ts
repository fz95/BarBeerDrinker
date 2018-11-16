import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
  barID: string;
  name: string;
  address: string;
  state: string;
 }
export interface Drinker {
  drinkerID: string;
  name: string;
  phone: string;
  address: string;
  state: string;
}

export interface Frequent {
  drinkerID: string;
  drinkerName: string;
  barID: string;
  barName: string;
}

export interface Likes {
  drinkerID: string;
  drinkerName: string;
  beerName: string;
}
export interface Beer {
  name: string;
  manf: string;
 }

 export interface Food {
  name: string;
  type: string;
 }
 export interface SoftDrink {
  name: string;
  flavor: string;
 }
@Injectable({
  providedIn: 'root'
})
export class ModifyService {

  constructor(
    public http: HttpClient
    ) { }


  getBars() {
    return this.http.get<Bar[]>('/api/bars');
  }

  getDrinkers() {
    return this.http.get<Drinker[]>('/api/drinkers');
  }

  submitQuery(post: string) {
    const body={q: post}
    return this.http.post<string>('/api/sqlQuery', body);
  }

  addBar(name:string, address: string, state:string){
    const body={
      barName: name,
      barAddress: address,
      barState: state
    }
    return this.http.post<string>('/api/addBar', body);

  }
  addDrinker(name:string, phone: string,address: string, state:string){
    const body={
      drinkerName: name,
      phone: phone,
      drinkerAddress: address,
      drinkerState: state
    }
    return this.http.post<string>('/api/addDrinker', body);

  }

  getFrequents(){
    return this.http.get<Frequent[]>('/api/frequents');

  }
  deleteFrequents(drinkerID: string, barID: string){
    return this.http.get<string>('/api/frequents/'+drinkerID+'/'+barID);

  }
  deleteBar(id: string){
    return this.http.get<string>('/api/bar/delete/'+id);

  }

  getLikes(){
    return this.http.get<Likes[]>('/api/likes');

  }
  getBeers(){
    return this.http.get<Beer[]>('/api/beers')
  }
  getFood(){
    return this.http.get<Food[]>('/api/food')
  }
  getSoftDrinks(){
    return this.http.get<SoftDrink[]>('/api/softDrinks')
  }
  deleteDrinker(id: string){
    return this.http.get<string>('/api/drinker/delete/'+id);

  }


}


