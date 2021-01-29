import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../services/categories/category.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {CustomerService} from "../services/customers/customer.service";

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  customer:any={customerID:0,name:"",email:""};

  constructor(private customerService: CustomerService, private route: Router, private flash: FlashMessagesService) {
  }

  ngOnInit(): void {
  }

  save(){
    this.customerService.add(this.customer).subscribe(data=>{});
    this.flash.show('Customer is added successfully', { cssClass:'alert alert-success',timeout:1000});
    setTimeout(() => {
      this.route.navigate(['customers']);
    }, 1000);  //1s
  }

}
