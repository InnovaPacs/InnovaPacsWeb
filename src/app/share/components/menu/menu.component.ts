import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { faUserMd, faBook, faHospitalUser, faUsers, faPowerOff, faChartBar, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public faHospitalUser = faHospitalUser;
  public faBook = faBook;
  public faUsers = faUsers;
  public faPowerOff = faPowerOff;
  public faChartBar = faChartBar;
  public faBuilding = faBuilding;
  public faUserMd = faUserMd;
  
  constructor(private router: Router, private oauthService: AuthService) { }

  ngOnInit(): void {
  }

  public closeSession(){
    this.oauthService.closeSession();
  }
}
