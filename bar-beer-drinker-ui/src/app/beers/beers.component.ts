import { Component, OnInit } from '@angular/core';
import { BeersService, Beer } from '../beers.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  beers: Beer[];
  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
   ) { 



  }
  
  ngOnInit() {
    this.getBeers();
  }

  getBeers(){
    this.beerService.getBeers().subscribe(
      data=>{
        this.beers=data;
      },
      error => {
        alert('Could not retrieve a list of beers');
      }
    );
  }
}
