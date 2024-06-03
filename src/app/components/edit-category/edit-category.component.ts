import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/Category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;
  categoryId: string = '';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'description': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.loadCategory(this.categoryId);
    });
  }

  loadCategory(categoryId: string) {
    this.categoryService.getById(categoryId).subscribe((category: Category) => {
      this.category = category;
      this.categoryForm.patchValue({
        name: this.category.name,
        description: this.category.description
      });
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      console.log('Invalid data');
      return;
    } else {
      // Cập nhật thông tin của danh mục
      this.categoryService.update(this.categoryId, this.categoryForm.value).subscribe(data => {
        console.log('Category updated:', data);
        // Sau khi cập nhật thành công, chuyển hướng về trang danh sách danh mục
        this.router.navigate(['listCate']);
      });
    }
  }
}
