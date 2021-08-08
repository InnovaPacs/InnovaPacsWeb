import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  public customScript = document.querySelector('#custom-script');
  public hideMenu = false;

  constructor() { }

  ngOnInit(): void {
    const url = `./assets/js/custom.js`;
    this.customScript.setAttribute('src',url);
  }

  handleMenuButton() {
    this.hideMenu = !this.hideMenu;
  }
}
