import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {ModifyService, Bar, Drinker,Frequent,Likes, Beer, Food, SoftDrink} from '../modify.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
  providers: [ConfirmationService]
})
export class ModifyComponent implements OnInit {
  queryReturn: string;
  bars: Bar[];
  frequents:Frequent[];
  likes:Likes[];
  drinkers: Drinker[];
  beers: Beer[];
  foods: Food[];
  softDrinks: SoftDrink[];
  constructor(
    private modifyService: ModifyService,
    private confirmationService: ConfirmationService 
  ) { 
    this.modifyService.getBars().subscribe(
      data => {
        this.bars = data;
      },
      error => {
        console.log('Could not retrieve a list of bars');
      }
    );

    this.modifyService.getDrinkers().subscribe(
      data=>{
        this.drinkers=data;
      },
      error => {
        console.log('Could not retrieve a list of drinkers');
      }
    );
    this.modifyService.getFrequents().subscribe(
      data=>{
        this.frequents=data;
      },
      error => {
        console.log('Could not retrieve a list of frequents');
      }
    );

    this.modifyService.getLikes().subscribe(
      data=>{
        this.likes=data;
      },
      error => {
        console.log('Could not retrieve a list of likes');
      }
    );

    
    this.modifyService.getBeers().subscribe(
      data=>{
        this.beers=data;
      },
      error => {
        console.log('Could not retrieve a list of beers');
      }
    );
    this.modifyService.getFood().subscribe(
      data=>{
        this.foods=data;
      },
      error => {
        console.log('Could not retrieve a list of foods');
      }
    );

    this.modifyService.getSoftDrinks().subscribe(
      data=>{
        this.softDrinks=data;
      },
      error => {
        console.log('Could not retrieve a list of soft drinks');
      }
    );

  }

  ngOnInit() {
  }

  submitQuery(){
    var sqlString=(document.getElementById("sqlquery") as HTMLInputElement).value;

    this.modifyService.submitQuery(sqlString).subscribe(
      data=>{
        this.queryReturn=data;
      },
       error => {
        alert('Could not execute query');
      }

    )
  }

  editBarClick(event){
   console.log(event.target.parentNode.id);

  }
  deleteBarClick(event){
    let id:string=event.target.parentNode.id;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete bar '+id+'? All records related to this bar will also be removed.',
      accept: () => {
        this.modifyService.deleteBar(id).subscribe(
          data => {
            alert(data);
            window.location.reload();

          },
          error => {
            console.log('Error deleting');
          }
        )}
    })

  }
  insertBarEvent(event){
    let barName:string=(document.getElementById("bars-barName") as HTMLInputElement).value;
    let barAddress:string=(document.getElementById("bars-address") as HTMLInputElement).value;
    let barState:string=(document.getElementById("bars-state") as HTMLInputElement).value;
    this.modifyService.addBar(barName,barAddress,barState).subscribe(
      data=>{
        alert(data)
        window.location.reload();

      },
       error => {
        alert('Could not add bar');
      }
      
    );
  }
  insertDrinkerEvent(event){
    let drinkerName:string=(document.getElementById("drinker-name") as HTMLInputElement).value;
    let phone:string=(document.getElementById("drinker-phone") as HTMLInputElement).value;
    let drinkerAddress:string=(document.getElementById("drinker-address") as HTMLInputElement).value;
    let drinkerState:string=(document.getElementById("drinker-state") as HTMLInputElement).value;

    this.modifyService.addDrinker(drinkerName,phone,drinkerAddress,drinkerState).subscribe(
      data=>{
        alert(data)
        window.location.reload();

      },
       error => {
        alert('Could not add drinker');
      }
      
    );

  }

  deleteDrinkerClick(event){
    let id:string=event.target.parentNode.id;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete drinker '+id+'? All records related to this drinker will also be removed.',
      accept: () => {
        this.modifyService.deleteDrinker(id).subscribe(
          data => {
            alert(data);
            window.location.reload();

          },
          error => {
            console.log('Error deleting');
          }
        )}
    })
  }

  deleteFrequentsClick(event){
    let id:string=event.target.parentNode.id;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete bar '+id+'? All records related to this bar will also be removed.',
      accept: () => {
        this.modifyService.deleteBar(id).subscribe(
          data => {
            alert(data);
            window.location.reload();

          },
          error => {
            console.log('Error deleting');
          }
        )}
    })

  }

  
}
