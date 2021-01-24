import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/products/product.service";
import {CategoryService} from "../services/categories/category.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public product:any={productID:0, name:"", price:0, categoryID:1, category:null}
  public categories:any;
  constructor(private productService : ProductService, private categoryService : CategoryService,
              private route: Router, private flash: FlashMessagesService) { }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data=>{
      this.categories=data;
    })
  }
  save() {
    this.product.categoryID=Number(this.product.categoryID);
    this.productService.add(this.product).subscribe(data=>{});
    this.flash.show('Product is added successfully', { cssClass:'alert alert-success',timeout:1000});
    setTimeout(() => {
      this.route.navigate(['products']);
    }, 1000);  //1s
  }
}


