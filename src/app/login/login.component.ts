import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { IUser, IUserServerModel } from '../data-interface';
import { Router } from '@angular/router';

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
    const user: IUser = {
      login: this.userEmail,
      pass: this.userPass
    };
    this.userService.loginUser(user)
      .subscribe((res: IUserServerModel) => {
        if (res.success) {
          this.userService.addUserInfo(res.user);
          if (res.user.login === 'Admin') {
            this.router.navigate(['admin/create-category']);
          } else {
            this.router.navigate(['user/categories']);
          }
        } else {
          this.errorMessage = res.message;
        }
      });
  }

  moveToHomePage() {
    this.router.navigate(['']);
  }
}
