import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: any;
  isADM: any;
  constructor(private auth: AuthService) {
    this.isLogin = this.auth.checkLogin()
    this.isADM = this.auth.checkAdmin()
   }

  ngOnInit() {
  }

  onLogout(){
    localStorage.clear();
    location.assign('/')
  }

}
