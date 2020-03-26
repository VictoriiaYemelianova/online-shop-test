import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ICreateLogUser, IUserServerModel } from '../users-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail: string;
  public userPass: string;
  public errorMessage: string;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {}

  logginIn() {
    const user: ICreateLogUser = {
      login: this.userEmail,
      pass: this.userPass
    };
    this.userService.loginUser(user)
      .subscribe((res: IUserServerModel) => {
        if (res.success) {
          this.userService.addUserInfo(res.user);
          this.router.navigate(['categories']);
        } else {
          console.log(res)
          this.errorMessage = res.message;
        }
      });
  }

  moveToHomePage() {
    this.router.navigate(['']);
  }
}
