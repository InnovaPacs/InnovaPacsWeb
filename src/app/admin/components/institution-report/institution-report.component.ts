import { Component, OnInit } from '@angular/core';
import { multi } from './data';

@Component({
  selector: 'app-institution-report',
  templateUrl: './institution-report.component.html',
  styleUrls: ['./institution-report.component.sass']
})
export class InstitutionReportComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [1200, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Modalidad';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  showDataLabel = true;

  colorScheme = {
    domain: ['#0000FF', '#FF0066', '#9900FF', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, { multi })
  }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }
}
