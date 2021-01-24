import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/products/product.service";
import {CustomerService} from "../services/customers/customer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {CategoryService} from "../services/categories/category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   public products:any=new Array();

  constructor(private productService : ProductService, private categoryService: CategoryService, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productService.getAll().subscribe(data=>{
      this.products=data;
      this.products.forEach((product:any)=>{
        this.categoryService.getById(product.categoryID).subscribe(data=>{
          let category:any=data;
          product.category=category.name;
        })
      })
    })
  }
  deleteProduct(id: number){
    if(confirm('Are you sur to delete this product?')) {
      this.products.forEach((element: any, index: number) => {
        if (element.productID == id)
          this.products.splice(index, 1);
      });
      this.productService.delete(id).subscribe(data => {
      });
      this.flash.show('Product is deleted successfully', {cssClass: 'alert alert-danger', timeout: 1000});
    }
  }
}
