import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public faBars = faBars;
  public faUser = faUser;
  @Output() handleMenuButton = new EventEmitter<FormGroup>();
  
  constructor() { }

  ngOnInit(): void {
    
  }

  handleButton(){
    this.handleMenuButton.emit();
  }
}
