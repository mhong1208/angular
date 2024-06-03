import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {
    name: '',
    password: '',
    confirm_pass: '',
    email: '',
    phone: ''
  };

  formTouched = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  onRegister() {
    this.formTouched = true;
    console.log('Password:', this.registerData.password);
    console.log('Confirm Password:', this.registerData.confirm_pass);

    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.confirm_pass) {
      return;
    }

    if (this.registerData.password !== this.registerData.confirm_pass) {
      alert('Mật khẩu không khớp!');
      return;
    }

    this.userService.register(this.registerData).subscribe(
      response => {
        console.log('Đăng kí thành công', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Đăng kí thất bại', error);
      }
    );
  }
}
