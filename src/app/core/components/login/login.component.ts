import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  invalidPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm() {
    return this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let formValue = this.loginForm.value;
      let roleId = 0;
      if (formValue.userName == 'Admin' && formValue.password == 'Admin@123') {
        roleId = 1;
        localStorage.setItem('roleId', roleId.toString());
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        let users: any = localStorage.getItem('users');
        if (users) {
          users = JSON.parse(users);
          let currentUser = users.find(
            (user: any) => user.userName == formValue.userName
          );
          if (currentUser) {
            if (currentUser.password == formValue.password) {
              roleId = 2;
              localStorage.setItem('roleId', roleId.toString());
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.router.navigateByUrl('/user/dashboard');
            } else {
              this.invalidPassword = true;
            }
          } else {
            // new user
            users.push(formValue);
            localStorage.setItem('users', JSON.stringify(users));
            roleId = 2;
            localStorage.setItem('roleId', roleId.toString());
            localStorage.setItem('currentUser', JSON.stringify(formValue));
            this.router.navigateByUrl('/user/dashboard');
          }
        } else {
          users = [formValue];
          localStorage.setItem('users', JSON.stringify(users));
          roleId = 2;
          localStorage.setItem('roleId', roleId.toString());
          localStorage.setItem('currentUser', JSON.stringify(formValue));
          this.router.navigateByUrl('/user/dashboard');
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
