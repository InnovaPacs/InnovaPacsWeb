import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() handleMenuButton = new EventEmitter<FormGroup>();
  
  constructor() { }

  ngOnInit(): void {
  }

  handleButton(){
    this.handleMenuButton.emit();
  }
}
