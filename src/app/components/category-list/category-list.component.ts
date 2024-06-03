import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories !: Category[];
  constructor(private categoryService: CategoryService,private router: Router, private auth: AuthService) { }

  ngOnInit() {
    let id = 1;
    return this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
      this.categories.forEach(category => {
        category.id = id++;
      });
    }, (error: any) => {
      console.log(error.message);
      if (error && error.status === 401){
        try {
          const refreshToken = this.auth.getRefreshToken();
          console.log(refreshToken);
          if(!refreshToken){
           this.router.navigate(['/login'])
          }

          this.auth.refreshToken({'refresh_token': refreshToken}).subscribe((res: any) =>{
            console.log(res);
            // cập nhật access token và refreshToken
            let jsonData = JSON.stringify(res);
            localStorage.setItem('login', jsonData);

            // gọi lại api lấy ds danh mục
            this.categoryService.getAll().subscribe(data => {
              this.categories = data as Category[];

            })

          })

        } catch (refreshError) {
          console.error('Error refreshing Token', refreshError);

        }
      }
    })
  }


  editCategory(id: number) {
    this.router.navigate(['/editCate', id]);
  }

  deleteCategory(id: string) {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      this.categoryService.delete(id).subscribe(
        () => {
          console.log('Category deleted');
          this.router.navigate(['listCate'])
          window.location.reload();
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

}
