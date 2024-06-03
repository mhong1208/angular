import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/models/Product';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product!: Product;
  listProduct: Product[] = [];




  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id']; // Thay vì 'categoryId'
      this.productService.getById(productId).subscribe((product: Product) => {
        this.product = product;

        // Kiểm tra nếu sản phẩm và danh mục tồn tại trước khi gọi API
        if (this.product && this.product.category) {
          this.productService.getProById(this.product.category.categoryId.toString()).subscribe(data => {
            this.listProduct = data;
            console.log(this.listProduct);
          }, error => {
            console.log(error.message);
          });
        }
      });
    });
  }

}
