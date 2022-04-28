
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

}
