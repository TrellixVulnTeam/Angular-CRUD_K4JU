import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = "http://localhost:3000/clientes"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer)
  }

  read(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl)
  }

  readById(id: string): Observable<Customer> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Customer>(url)
  }

  update(customer: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/${customer.id}`
    return this.http.put<Customer>(url, customer)
  }

  delete(id: number): Observable<Customer> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Customer>(url)
  }
}


