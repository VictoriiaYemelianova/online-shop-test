import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ICreateLogUser, IUserServerModel } from '../users-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public userEmail: string;
  public userPass: string;
  public errorMessage: string;

  constructor( private userService: UserServiceService, private router: Router ) { }

  ngOnInit(): void {
  }

  createUser() {
    const newUser: ICreateLogUser = {
      login: this.userEmail,
      pass: this.userPass
    }
    this.userService.createUser(newUser)
      .subscribe((res: IUserServerModel) => {
        if (res.success) {
          this.userService.addUserInfo(res.user);
          this.router.navigate(['categories']);
        } else {
          this.errorMessage = res.message;
        }
      })
  }

  moveToHomePage() {
    this.router.navigate(['']);
  }

}
