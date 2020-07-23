import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  public logoutIcon = faSignOutAlt;

  constructor( private userService: UserServiceService) { }

  ngOnInit(): void {}

  onLogOut() {
    this.userService.logOut();
  }
}
