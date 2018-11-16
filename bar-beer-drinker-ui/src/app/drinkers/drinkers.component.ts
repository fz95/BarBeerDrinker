import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DrinkersService, Drinker} from '../drinkers.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-drinkers',
  templateUrl: './drinkers.component.html',
  styleUrls: ['./drinkers.component.css']
})
export class DrinkersComponent implements OnInit {
  drinkers: Drinker[];

  constructor(
    private drinkersService: DrinkersService,
    private route: ActivatedRoute

  ) { }
  ngOnInit() {
    this.getDrinkers();


    
    
  }

  getDrinkers(){
    this.drinkersService.getDrinkers().subscribe(
      data=>{
        this.drinkers=data;
      },
      error => {
        alert('Could not retrieve a list of drinkers');
      }
    );
  }
}
