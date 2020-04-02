import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { IUser, IUserServerModel } from '../data-interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail: string;
  public userPass: string;
  public errorMessage: string;
  public loginForm: FormGroup;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.userService.loginUser(formValue)
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

  onCancel() {
    this.router.navigate(['']);
  }
}
