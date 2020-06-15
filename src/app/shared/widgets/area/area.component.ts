import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: {}; 

  @Input() data = [];
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      series: this.data,
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    }

    HC_exporting(Highcharts);

    setTimeout(() => { 
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
