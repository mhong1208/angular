import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/models/Product';
import { ProductService } from 'src/services/product.service';
import { CategoryService } from 'src/services/category.service';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories: Category[] = [];
  id: number = 1;

  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) {
    this.product = new Product();
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'image': new FormControl(null, [Validators.required]), // for file upload
      'price': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    let id = 1;
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
      this.categories.forEach(category => {
        category.id = id++;
      });
    }, error => {
      console.log(error.message);
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ!');
      console.log('Invalid data');
      return;
    }

    const selectedCategory = this.categories.find(cat => cat._id === this.productForm.value.category);

    if (!selectedCategory) {
      alert('Danh mục không hợp lệ!');
      console.log('Invalid category');
      return;
    }

    // Gán giá trị từ biểu mẫu cho đối tượng product
    this.product.name = this.productForm.value.name;
    this.product.image = this.productForm.value.image;
    this.product.price = this.productForm.value.price;
    this.product.quantity = this.productForm.value.quantity;
    this.product.category = {
      categoryId: this.productForm.value.category,
      categoryName: selectedCategory.name
    };
    this.product.description = this.productForm.value.description;

    // Lưu sản phẩm mới
    this.productService.save(this.product).subscribe(data => {
      console.log(data);
      this.router.navigate(['listProduct']);
    });
  }
}
