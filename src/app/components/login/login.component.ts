import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  formTouched= false
  loginError = '';

  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('Password:', this.loginData.password);
    console.log('Email:', this.loginData.email);

    this.formTouched = true;

    if (!this.loginData.password || !this.loginData.email ) {
      return;
    }

    this.userService.login(this.loginData).subscribe(
      response => {
        console.log('Đăng nhập thành công', response);
        let jsonData = JSON.stringify(response);
        localStorage.setItem('login',jsonData)
        this.router.navigate(['/']).then(() => {
          this.location.go(this.location.path()); // Reset the path
          window.location.reload(); // Refresh the page
        });


      },
      error => {
        console.error('Đăng nhập thất bại', error);
        if (error.status === 401) {
          this.loginError = 'Email hoặc mật khẩu không đúng.';
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.';
        }
      }
    );
  }
  }

