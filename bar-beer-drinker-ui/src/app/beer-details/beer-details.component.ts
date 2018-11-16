import { Component, OnInit } from '@angular/core';
import { BeersService, BeerLocation } from '../beers.service';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
declare const Highcharts: any;

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  beerName: string
  beerLocations: BeerLocation[];
 

  filterOptions: SelectItem[] = [
    {
      'label': '',
      'value': 'empty'
      },
    {
    'label': 'Low price first',
    'value': 'low price'
    },
    {
    'label': 'High price first',
    'value': 'high price'
    }
    ];
   

  
  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((paramMap)=>{
      this.beerName=paramMap.get('beer')
    });

    this.beerService.getBarsSelling(this.beerName).subscribe(
      data=>{
        this.beerLocations=data;
      }
    );
    this.beerService.getTopLocationsSold(this.beerName).subscribe(
      data=>{
        const names = [];
        const beerCounts = [];
        data.forEach(bar => {
          names.push(bar.name);
          beerCounts.push(bar.beerCount);
        });
        // use the line below to render the graph
         this.renderChartTopLocations(names, beerCounts);
      },
      error => {
        alert('Could not retrieve a list of top locations');
      }
    );

    this.beerService.getTopDrinkers(this.beerName).subscribe(
      data=>{
        const names = [];
        const bought = [];
        data.forEach(drinker => {
          names.push(drinker.name);
          bought.push(drinker.bought);
        });
        // use the line below to render the graph
         this.renderChartTopDrinkers(names, bought);
      },
      error => {
        alert('Could not retrieve a list of top consumers');
      }
    );

    this.beerService.getTimeDist(this.beerName).subscribe(
      data=>{
        const hours = [];
        const sold = [];
        let i: any=0;
        for (i=0;i<24;i++){
          hours.push(i);
          data.forEach(hour => {
            if (hour.hour==i){
              sold.push(hour.sold);
            }
          });
          if (sold[i]==null){
            sold.push(0);
          }

        }

        // use the line below to render the graph
         this.renderChartTimeDist(hours, sold);
      },
      error => {
        alert('Could not retrieve a list of top locations');
      }
    );
  }

  ngOnInit() {
  }

  sortBy(selectedOption: string) {
    if (selectedOption === 'low price') {
      this.beerLocations.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === 'high price') {
      this.beerLocations.sort((a, b) => {
        return b.price - a.price;
      });
    } 
  }

 
  renderChartTopLocations(names: string[], beerCounts: number[]) {
    Highcharts.chart('bargraphTopLocations', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Most Sold In'
      },
      xAxis: {
        categories: names,
        title: {
          text: 'Bars'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count'
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
        data: beerCounts
      }]
    });
    }
   

    renderChartTopDrinkers(names: string[], bought: number[]) {
      Highcharts.chart('bargraphTopDrinkers', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Top Consumers of '+this.beerName
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
            text: 'Bought'
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
          data: bought
        }]
      });
      }


    renderChartTimeDist(hours: string[], sold: number[]) {
      Highcharts.chart('bargraphTimeDist', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Number of '+this.beerName+' Sold At Certain Hours'
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
            text: 'Sold'
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
          data: sold
        }]
      });
      }
  
}
