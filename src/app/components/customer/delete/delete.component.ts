import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private customerService: CustomerService,
                      private router: Router,
                      private route: ActivatedRoute) { }

  customer: Customer = {
    cpf: "",
    nome: "",
    sexo: "",
    dat_nasc: "",
    email: "",
    phone: ""
}


  formatDate(date: any) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.readById(id!).subscribe(customer => {
      this.customer = customer;
      
    } )
  }

  deleteCustomer(): void {
    this.customerService.delete(this.customer.id!).subscribe(()=> {
    this.customerService.showMessage(`O cliente ${this.customer.nome} foi removido.`)
    this.router.navigate(['/clientes'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }


}
