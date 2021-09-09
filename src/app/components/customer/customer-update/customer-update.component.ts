import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customer: Customer = {
    cpf: "",
    nome: "",
    sexo: "",
    dat_nasc: "",
    email: "",
    phone: ""
}

  constructor(private customerService: CustomerService,
              private router: Router,
              private route: ActivatedRoute) { }


  formatDate(date: any) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.readById(id!).subscribe(customer => {
      const date = new Date(customer.dat_nasc);
      customer.dat_nasc = this.formatDate(date);
      this.customer = customer;
      
    } )
  }

  verifyCPF(cpf: string): boolean {
    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
}


  onSubmit(form: any) {
    console.log(form)

    console.log(this.customer)
  }

  

  updateCustomer(): void {
    const date = new Date(this.customer.dat_nasc).toISOString()
    //this.customer.dat_nasc = date
    this.customerService.update(this.customer).subscribe(()=> {
    this.customerService.showMessage(`O cliente ${this.customer.nome} foi atualizado`)
    this.router.navigate(['/clientes'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }

}
