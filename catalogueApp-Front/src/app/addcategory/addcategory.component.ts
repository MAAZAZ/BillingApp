import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../services/categories/category.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  category:any={id:0,name:""};
  constructor(private categoryService: CategoryService, private route: Router, private flash: FlashMessagesService) {
  }
  ngOnInit(): void {
  }
  save(){
    this.categoryService.add(this.category).subscribe(data=>{});
    this.flash.show('Category is added successfully', { cssClass:'alert alert-success',timeout:1000});
    setTimeout(() => {
      this.route.navigate(['categories']);
    }, 1000);  //1s
  }
}

