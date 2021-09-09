import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-read',
  templateUrl: './customer-read.component.html',
  styleUrls: ['./customer-read.component.css']
})
export class CustomerReadComponent implements OnInit {

  customers: Customer[] = []
  displayedColumns = ['id', 'cpf', 'nome', 'sexo', 'dat_nasc', 'email', 'phone', 'action']


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.read().subscribe(customers => {
      this.customers = customers
      console.log(customers)
    })
  }

}
