import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  public hideMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleMenuButton() {
    console.log('handleMenuButton :::::');
    
    this.hideMenu = !this.hideMenu;
  }
}
