import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/products/product.service";
import {CategoryService} from "../services/categories/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  public product:any;
  public categories:any;
  public id:string="";
  constructor(private productService : ProductService, private categoryService : CategoryService,
              private route: Router, private flash: FlashMessagesService, private routeActive: ActivatedRoute) { }
  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.productService.getById(this.id).subscribe(data=>{
      this.product=data;
    });
    this.categoryService.getAll().subscribe(data=>{
      this.categories=data;
    })
  }
  save() {
    this.product.categoryID=Number(this.product.categoryID);
    this.productService.update(Number(this.id), this.product).subscribe(data=>{});
    this.flash.show('Product is added successfully', { cssClass:'alert alert-success',timeout:1000});
    setTimeout(() => {
      this.route.navigate(['products']);
    }, 1000);  //1s
  }
}

