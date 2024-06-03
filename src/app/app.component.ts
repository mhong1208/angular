import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Import NavigationEnd từ @angular/router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
