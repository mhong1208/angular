import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/Product';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newProducts: Product[] = [];
  hotProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    let newId = 1;
    let hotId = 1;

    // Gọi phương thức để tải sản phẩm mới
    this.productService.getNewPro().subscribe(data => {
      this.newProducts = data as Product[];
      console.log(this.newProducts);
      this.newProducts.forEach(product => {
        product.id = newId++;
      });
    }, error => {
      console.log(error.message);
    });

    // Gọi phương thức để tải sản phẩm nổi bật
    this.productService.getHotPro().subscribe(data => {
      this.hotProducts = data as Product[];
      console.log(this.hotProducts);
      this.hotProducts.forEach(product => {
        product.id = hotId++;
      });
    }, error => {
      console.log(error.message);
    });


  }


}
