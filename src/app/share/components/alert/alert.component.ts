import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {
  @Input() 
  public type: string;
  @Input() 
  public show: boolean;
  @Input() 
  public message: string;

  constructor() { }

  ngOnInit(): void {
    this.type = `alert-${this.type}`;
  }

}
