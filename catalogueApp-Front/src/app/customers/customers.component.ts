import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customers/customer.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public customers : any;
  public edithidden:boolean=false;
  public key:string="";
  constructor(private customerService : CustomerService, private flash: FlashMessagesService) { }
  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers(){
    this.customerService.getAll().subscribe(data=>{
      this.customers=data;
    })
  }
  ChangeStatus(id:string){
    this.key=id;
    this.edithidden=!this.edithidden;
  }
  editCustomer(customer : any){
    this.customerService.update(customer.customerId, customer).subscribe(data=>{});
    this.flash.show('Customer is updated successfully', { cssClass: 'alert alert-primary', timeout: 1000 });
    this.edithidden=!this.edithidden;
    this.key="";
  }
  deleteCustomer(id: number){
    if(confirm('Are you sur to delete this customer?')){
      this.customers.forEach((element: any, index: number)=>{
        if(element.customerId==id)
          this.customers.splice(index,1);
      });
      this.customerService.delete(id).subscribe(data=>{})
      this.flash.show('Customer is deleted successfully', { cssClass: 'alert alert-danger', timeout: 1000 });
    }
  }
}
