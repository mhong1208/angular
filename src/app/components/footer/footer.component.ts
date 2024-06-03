import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  routerUrl: string = ''; // Khai báo biến routerUrl

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerUrl = event.url; // Cập nhật giá trị của biến routerUrl khi có sự kiện navigation
      }
    });
  }

}
