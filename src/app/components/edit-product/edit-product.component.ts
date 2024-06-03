import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { Product } from '../../../models/Product';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;
  productId: string = '';
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Khởi tạo biểu mẫu FormGroup
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'image': new FormControl(null, [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });

    // Lấy id product từ url
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        // Hiển thị dữ liệu của product
        this.productService.getById(this.productId).subscribe((product: Product) => {
          this.product = product;
          this.productForm.patchValue({
            'name': product.name,
            'image': product.image,
            'price': product.price,
            'quantity': product.quantity,
            'category': product.category?.categoryId,
            'description': product.description
          });
        });
      }
    });
    //  load danh sách danh mục
    this.loadCategories();
  }


  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    }, error => {
      console.log(error.message);
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      return;
    }
    // Lấy giá trị từ biểu mẫu form product
    const formValues = this.productForm.value;

    // Lấy categoryId từ form value
    const categoryId = formValues.category;

    // Tìm tên của category từ this.categories dựa trên _id
    const selectedCategory = this.categories.find(cat => cat._id === categoryId);
    const categoryName = selectedCategory ? selectedCategory.name : '';

    // Tạo đối tượng updatedProduct với categoryId và categoryName
    const updatedProduct: Product = {
      ...formValues,
      _id: this.productId,
      category: { _id: categoryId, categoryName: categoryName }
    };

    this.productService.update(this.productId, updatedProduct).subscribe(data => {
      console.log('Product updated:', data);
      this.router.navigate(['listProduct']);
    }, error => {
      console.log('Error updating product:', error);
    });
  }


}
