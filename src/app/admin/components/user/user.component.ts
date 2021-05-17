import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.sass']
})
export class UserComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.users = await this.userService.findAll().toPromise() as User[];
  }
}
