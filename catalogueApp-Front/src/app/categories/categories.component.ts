import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/products/product.service";
import {CategoryService} from "../services/categories/category.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories : any;
  public edithidden:boolean=false;
  public key:string="";
  constructor(private categorieService : CategoryService, private flash: FlashMessagesService) { }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.categorieService.getAll().subscribe(data=>{
      this.categories=data;
    })
  }
  ChangeStatus(id:string){
    this.key=id;
    this.edithidden=!this.edithidden;
  }
  editCategory(product : any){
    this.categorieService.update(product.categoryID, product).subscribe(data=>{});
    this.flash.show('Category is updated successfully', { cssClass: 'alert alert-primary', timeout: 1000 });
    this.edithidden=!this.edithidden;
    this.key="";
  }
  deleteCategory(id: number){
    if(confirm('Are you sur to delete this category?')){
      this.categories.forEach((element: any, index: number)=>{
        if(element.categoryID==id)
          this.categories.splice(index,1);
      });
      this.categorieService.delete(id).subscribe(data=>{})
      this.flash.show('Category is deleted successfully', { cssClass: 'alert alert-danger', timeout: 1000 });
    }
  }
}
