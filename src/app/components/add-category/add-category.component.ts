import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';
import { CategoryService } from './../../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'description': new FormControl('', Validators.required) // Thêm trường mô tả vào form
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ.!')
      console.log('Invalid data');
      return;
    } else {
      // Gán giá trị từ form vào đối tượng category trước khi lưu
      this.category.name = this.categoryForm.value.name;
      this.category.description = this.categoryForm.value.description;

      // Lưu danh mục
      this.categoryService.save(this.category).subscribe(data => {
        console.log(data);
        this.router.navigate(['listCate']);
      });
    }
  }
}
