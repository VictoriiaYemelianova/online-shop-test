import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public logoutIcon = faSignOutAlt;

  constructor( private userService: UserServiceService) { }

  ngOnInit(): void {}

  onLogOut() {
    this.userService.logOut();
  }
}
