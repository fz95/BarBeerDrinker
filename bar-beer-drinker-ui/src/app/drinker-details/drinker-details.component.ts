import { Component, OnInit } from '@angular/core';
import {DrinkersService, Drinker, Transaction, Ordered, TransAt, Purchase} from '../drinkers.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import {MenuItem} from 'primeng/api';


declare const Highcharts: any;
enum Days{
  "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"
}

@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})



export class DrinkerDetailsComponent implements OnInit {

  drinkerName: string;
  drinkerTransactions: Transaction[];
  madeTransAt: TransAt[];
  drinkerInfo: Drinker;
  orderedBeers: Ordered[];
  transAtBar: Transaction[]=[];
  transactions: MenuItem[]=[];

  constructor(
    private drinkersService: DrinkersService,
    private route: ActivatedRoute

  ) { 
    this.route.paramMap.subscribe((paramMap)=>{
      this.drinkerName=paramMap.get('drinker')
    });

    /*this.drinkersService.getDrinkerTrans(this.drinkerName).subscribe(
      data=>{
        this.drinkerTransactions=data;

      },
      error => {
        alert('Could not retrieve a list of transactions');
      }
    );*/

    this.drinkersService.getTransAt(this.drinkerName).subscribe(
      data=>{
        this.madeTransAt=data;
        this.transactionInfo();

      },
      error => {
        alert('Could not retrieve a list of transactions');
      }
    );
    
    this.drinkersService.getDrinker(this.drinkerName).subscribe(
      data=>{
        this.drinkerInfo=data;
      },
     
    );

    this.drinkersService.getMostOrderedBeers(this.drinkerName).subscribe(
      data=>{
        const beers = [];
        const quantity = [];
        data.forEach(beer => {
        beers.push(beer.beerName);
        quantity.push(beer.quantity);
        });
        // use the line below to render the graph
         this.renderChartMostOrdered(beers, quantity);
      },
      error => {
        alert('Could not retrieve a list of ordered beers');
      }
    );

    this.drinkersService.getSpendingsPerBar(this.drinkerName).subscribe(
      data=>{
        console.log(data);
        const bars = [];
        const spendings = [];
        data.forEach(bar => {
          bars.push(bar.name);
          spendings.push(bar.totalSpendings);
        });
        // use the line below to render the graph
         this.renderChartSpendsPerBar(bars, spendings);
      },
      error => {
        alert('Could not retrieve a list of spendings');
      }
    );
    this.drinkersService.getSpendingsPerDay(this.drinkerName).subscribe(
      data=>{
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
        const spendings = [];
        let i: any=0;
        for (i=0;i<7;i++){
          data.forEach(dataDay => {
            if (dataDay.day==Days[i]){
              spendings.push(dataDay.totalSpendings);
            }
            
          });
          if(spendings[i]==null){
            spendings.push(0);
          }
        }
       
        // use the line below to render the graph
         this.renderChartSpendsPerDay(days, spendings);
      },
      error => {
        alert('Could not retrieve a list of spendings');
      }
    );
    
  }

  ngOnInit() {

  }

  renderChartMostOrdered(beers: string[], quantity: number[]) {
    Highcharts.chart('bargraphOrdered', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Most Ordered Beers'
      },
      xAxis: {
        categories: beers,
        title: {
          text: 'Beers'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of orders'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
          enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: quantity
      }]
    });
    }

    renderChartSpendsPerBar(bars: string[], spendings: number[]) {
      Highcharts.chart('bargraphSpendingsBar', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Total Spendings In Different Bars'
        },
        xAxis: {
          categories: bars,
          title: {
            text: 'Bars'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Spendings'
          },
          labels: {
            overflow: 'justify',
            formatter: function () {
              return '$' + this.value;
            }
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
            enabled: true
            }
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          data: spendings
        }]
      });
      }

    renderChartSpendsPerDay(days: string[], spendings: number[]) {
      Highcharts.chart('bargraphSpendingsDay', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Total Spendings On Different Days'
        },
        xAxis: {
          categories: days,
          title: {
            text: 'Day'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Spendings'
          },
          labels: {
            overflow: 'justify',
            formatter: function () {
              return '$' + this.value;
            }
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
            enabled: true
            }
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          data: spendings
        }]
      });
      }

    transactionInfo(){
      let i: number=0;
      for(i=0;i<this.madeTransAt.length;i++){
        let barName: string=this.madeTransAt[i].name;
        let trans: Transaction[]=[];
        let transItems: MenuItem[]=[];
        
        //populate the transactions for each bar
        this.drinkersService.getTransAtBar(this.drinkerName, barName).subscribe(
          data=>{
            trans=data;
            let j: number=0;
            for (j=0; j<trans.length;j++){
              let purchases: Purchase[]=[];
              let purchaseItems: MenuItem[]=[];
              //get the purchases for each transaction
              this.drinkersService.getPurchases(trans[j].transactionID).subscribe(
                data=>{
                  purchases=data;
                  let k: number=0;
                  for (k=0;k<purchases.length;k++){
                      let item:MenuItem={
                        label:purchases[k].itemName+" price: $"+purchases[k].price+"      ||      quantity: "+purchases[k].quantity
                      }
                      purchaseItems.push(item);
                  }
                }

              );

              let transItem: MenuItem={
                label: "Total: $"+trans[j].totalAmount+"      ||     Tip: $"+trans[j].tip+"     ||     Time: "+trans[j].time+"           "+trans[j].day,
                items: purchaseItems
              }
              transItems.push(transItem);
            }
          }
        );

        let bar: MenuItem={
          label: barName,
          items:transItems
        };

        this.transactions.push(bar);

      }   
  
    }

}


