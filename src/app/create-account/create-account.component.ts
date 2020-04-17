import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { IUser, IServerModel } from '../data-interface';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public userEmail: string;
  public userPass: string;
  public errorMessage: string;
  public createForm: FormGroup;

  constructor( private userService: UserServiceService, private router: Router ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    console.log('create')
    const formValue = this.createForm.value;
    formValue.role = 'user';
    this.userService.createUser(formValue)
      .subscribe((res: IServerModel) => {
        if (res.success) {
          this.router.navigate(['user/categories']);
        } else {
          this.errorMessage = res.message;
        }
      });
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
