import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router, private oauthService: AuthService) { }

  ngOnInit(): void {
  }

  public closeSession(){
    this.oauthService.closeSession();
  }
}
