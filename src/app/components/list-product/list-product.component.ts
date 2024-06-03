import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/Product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products !: Product[];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    let id = 1;
    return this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
      this.products.forEach(product => {
        product.id = id++;
      });
    }, error => {
      console.log(error.message);
    })
  }

  editProduct(id: number) {
    this.router.navigate(['/editProduct', id]);
  }


  deleteProduct(id: string) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      this.productService.delete(id).subscribe(
        () => {
          this.router.navigate(['listProduct'])
          window.location.reload();
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
}
