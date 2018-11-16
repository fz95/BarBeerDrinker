import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Drinker {
  drinkerID: string;
  name: string;
  phone: string;
  address: string;
  state: string;
 }
 export interface Transaction {
  transactionID: number;
  drinkerID: string;
  drinkerName: string;
  barID: string;
  barName: string;
  barState: string;
  totalAmount: string;
  tip: string;
  time: string;
  day: string

 }
 export interface Ordered{
   beerName: string;
   quantity: number;
 }

export interface barSpendings{
  name: string;
  totalSpendings: number;
}
export interface daySpendings{
  day: string;
  totalSpendings: number;
}
export interface TransAt{
  name: string;
}
export interface Purchase{
  itemName: string;
  quantity: number;
  price: string;
}
@Injectable({
  providedIn: 'root'
})
export class DrinkersService {

  constructor(public http: HttpClient) { }
  getDrinkers() {
    return this.http.get<Drinker[]>('/api/drinkers');
  }

  getDrinkerTrans(drinker: string){
    return this.http.get<Transaction[]>('/api/drinkers/'+drinker);
  }

  getDrinker(drinker: string){
    return this.http.get<Drinker>('/api/drinkerInfo/'+drinker);

  }

  getMostOrderedBeers(drinker: string){
    return this.http.get<Ordered[]>('/api/drinkers/'+drinker+'/mostOrdered');

  }
  getSpendingsPerBar(drinker: string){
    return this.http.get<barSpendings[]>('/api/drinkers/'+drinker+'/spendsPerBar');

  }
  getSpendingsPerDay(drinker: string){
    return this.http.get<daySpendings[]>('/api/drinkers/'+drinker+'/spendsPerDay');

  }

  getTransAt(drinker: string){
    return this.http.get<TransAt[]>('/api/drinkers/'+drinker+'/transAt');

  }
  getTransAtBar(drinker:string, bar:string){
    return this.http.get<Transaction[]>('/api/drinkers/'+drinker+'/'+bar);

  }
  getPurchases(id: number){
    return this.http.get<Purchase[]>('/api/transactions/'+id);

  }
}
