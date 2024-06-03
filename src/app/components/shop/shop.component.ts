import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/models/Category';
import { Product } from 'src/models/Product';
import { CartService } from 'src/services/cart.service';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] =[]
  searchName: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductService, private router: Router, private cartService: CartService, private categoryService: CategoryService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    this.loadAllProducts()
    this.loadCategories()
  }

  loadAllProducts(){
    this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
    }, error => {
      console.log(error.message);
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
    }, error => {
      console.log(error.message);
    });
  }

  searchProducts() {
    if (this.searchName) {
      this.productService.search(this.searchName).subscribe(data => {
        this.products = data as Product[];
        console.log(this.products);
      }, error => {
        console.log(error.message);
      });
    } else {
      this.loadAllProducts();
    }
  }

  filterByCategory(categoryId: string) {
    // this.selectedCategory = categoryId;
    if (categoryId) {
      this.productService.getProById(categoryId).subscribe(data => {
        this.products = data as Product[];
        console.log(this.products);
      }, error => {
        console.log(error.message);
      });
    } else {
      this.loadAllProducts();
    }
  }

}
