import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  // Verifica se o CPF é válido
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

  
  //criação do objeto principal

  customer: Customer = {
      cpf: "",
      nome: "",
      sexo: "",
      dat_nasc: '',
      email: "",
      phone: ""
  }

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerCustomer(): void {
    
    const date = new Date(this.customer.dat_nasc).toISOString()
    this.customer.dat_nasc = date
    this.customerService.create(this.customer).subscribe(()=> {
    this.customerService.showMessage(`O cliente ${this.customer.nome} foi adicionado.`)
    this.router.navigate(['/clientes'])
    })
    
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }


}
