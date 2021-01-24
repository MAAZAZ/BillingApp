import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AddcategoryComponent} from "./addcategory/addcategory.component";
import {AddcustomerComponent} from "./addcustomer/addcustomer.component";
import {AddproductComponent} from "./addproduct/addproduct.component";
import {EditproductComponent} from "./editproduct/editproduct.component";

const routes: Routes = [
  { path: '',pathMatch: 'full', redirectTo: "products"},
  { path: 'products', component: ProductsComponent},
  { path: 'products/add', component: AddproductComponent},
  { path: 'products/edit/:id', component: EditproductComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'categories/add', component: AddcategoryComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/add', component: AddcustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
