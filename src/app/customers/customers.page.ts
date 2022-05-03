
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  customers: any = [];
  searchedCustomer: any;

  permision: boolean;

  constructor(
    private router: Router ,
    private http: HttpClient ) { }

  ngOnInit() {
    this.permision = true;
    console.log('Cargando customers');
    this.getCustomers().subscribe(res => {
        console.log('Res', res);
        this.customers = res;
        this.searchedCustomer = this.customers;
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getCustomers() {
    return this.http
    .get('assets/files/customers.json')
    .pipe( map((res: any) =>res.data) );
  }

  searchCustomer(event){
    const text = event.target.value;
    console.log('Busqueda val: ' + text);

    this.searchedCustomer = this.customers;
    console.log(this.searchedCustomer);

    if (text && text.trim() !== ''){

      this.searchedCustomer = this.searchedCustomer.filter(
        (customer: any) => (customer.name.toLowerCase().indexOf(text.toLowerCase()) > -1));
    }

  }
}
