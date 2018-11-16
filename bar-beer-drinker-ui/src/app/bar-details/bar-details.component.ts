import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem, TopSpender } from '../bars.service';

import { HttpResponse } from '@angular/common/http';
declare const Highcharts: any;

enum Days{
  "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"
}

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {
  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
      route.paramMap.subscribe((paramMap) =>{
        this.barName = paramMap.get('bar');
      });

      this.barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          }else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the the console');
          }
        }
      );
      
      this.barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
          }
      );
      
      this.barService.getTopSpenders(this.barName).subscribe(
        data => {
          const names = [];
          const amounts = [];
          data.forEach(drinker => {
            names.push(drinker.name);
            amounts.push(drinker.amount);
          });
          // use the line below to render the graph
           this.renderChartTopSpenders(names, amounts);
        },
        error => {
          alert('Could not retrieve a list of top spenders');
        }
      );

      this.barService.getTopBeers(this.barName).subscribe(
        data => {
          const names = [];
          const sold = [];
          data.forEach(beer => {
            names.push(beer.name);
            sold.push(beer.sold);
          });
          // use the line below to render the graph
           this.renderChartTopBeers(names, sold);
        },
        error => {
          alert('Could not retrieve a list of top beers');
        }
      );  
      
      this.barService.getTopManf(this.barName).subscribe(
        data => {
          const manfs = [];
          const sold = [];
          data.forEach(manf => {
            manfs.push(manf.manf);
            sold.push(manf.sold);
          });
          // use the line below to render the graph
           this.renderChartTopManf(manfs, sold);
        },
        error => {
          alert('Could not retrieve a list of top manufacturers');
        }
      );  

      this.barService.getTimeDist(this.barName).subscribe(
        data=>{
          const hours = [];
          const sales = [];
          let i: any=0;
          for (i=0;i<24;i++){
            hours.push(i);
            data.forEach(hour => {
              if (hour.hour==i){
                sales.push(hour.sales);
              }
            });
            if (sales[i]==null){
              sales.push(0);
            }
      
          }
      
          // use the line below to render the graph
           this.renderChartTimeDist(hours, sales);
        },
        error => {
          alert('Could not retrieve data');
        }
      );
     

      this.barService.getDayDist(this.barName).subscribe(
        data=>{
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
          const sales = [];
          let i: any=0;
          for (i=0;i<7;i++){
            data.forEach(day => {
              if (day.day==Days[i]){
                sales.push(day.sales);
              }
      
            });
            if(sales[i]==null){
              sales.push(0);
            }
          }
      
          // use the line below to render the graph
           this.renderChartDayDist(days, sales);
        },
        error => {
          alert('Could not retrieve data');
        }
      );

    }

    ngOnInit() {}
 
  renderChartTopSpenders(names: string[], amounts: number[]) {
    Highcharts.chart('bargraphTopSpenders', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Spenders'
      },
      xAxis: {
        categories: names,
        title: {
          text: 'Name'
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
        data: amounts
      }]
    });
  }

  renderChartTopBeers(names: string[], sold: number[]) {
    Highcharts.chart('bargraphTopBeers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Beers Sold'
      },
      xAxis: {
        categories: names,
        title: {
          text: 'Beer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Sold'
        },
        labels: {
          overflow: 'justify',
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
        data: sold
      }]
    });
  }

  renderChartTopManf(manfs: string[], sold: number[]) {
    Highcharts.chart('bargraphTopManf', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Manufacturers'
      },
      xAxis: {
        categories: manfs,
        title: {
          text: 'Manufacturer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Sold'
        },
        labels: {
          overflow: 'justify',
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
        data: sold
      }]
    });
  }


  renderChartTimeDist(hours: string[], sales: number[]) {
    Highcharts.chart('bargraphTimeDist', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of Sales At Certain Hours'
      },
      xAxis: {
        categories: hours,
        title: {
          text: 'Hours'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Sales'
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
        data: sales
      }]
    });
    }
  
  
  renderChartDayDist(days: string[], sales: number[]) {
    Highcharts.chart('bargraphDayDist', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of Sales On Certain Days'
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
          text: 'Sales'
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
        data: sales
      }]
    });
    }



}
