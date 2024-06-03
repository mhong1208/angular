import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuthGuard } from './auth/auth-guard';
import { AdminGuard } from './auth/admin-guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'listCate', component: CategoryListComponent, canActivate: [AdminGuard] },
  { path:'addCate', component: AddCategoryComponent },
  { path:'editCate/:id', component: EditCategoryComponent },
  { path:'login', component: LoginComponent },
  { path:'listProduct', component:  ListProductComponent},
  { path:'addProduct', component:  AddProductComponent},
  { path:'editProduct/:id', component:  EditProductComponent},
  { path:'productDetail/:id', component:  DetailProductComponent},
  { path:'cart', component:  CartComponent},
  { path:'register', component:  RegisterComponent},
  { path:'shop', component:  ShopComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryListComponent,
    HomeComponent,
    LoginComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    DetailProductComponent,
    CartComponent,
    RegisterComponent,
    ShopComponent





   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
