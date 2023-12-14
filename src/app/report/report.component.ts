import { Component, OnInit, Inject } from '@angular/core';
import { ChartConfiguration  } from 'chart.js';
// import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {


 public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true
  };

  public radarChartLabels!: string[];


 public radarChartData: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [50, 50, 50, 50], label: 'Series B' },
    { data: [0, 0, 0, 0], label: 'Min' },
    { data: [50, 50, 50, 50], label: 'Mean' },
    { data: [100, 100, 100, 100], label: 'Max' }
    
  ];


  //public radarChartType: ChartType = 'radar';

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {}

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}

