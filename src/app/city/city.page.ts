import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  [x: string]: any;
  id: any;
  finalId: number;
  cities: any = [];
  name: string;
  imagen: string;
  desc: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.finalId = this.id -1 ;
    console.log("id: " + this.id);

    this.getCities().subscribe(res=>{
      console.log('Res', res);
      this.cities = res;
      this.name = this.cities[this.finalId].name;
      this.imagen = '../../assets/cities-img/' + this.cities[this.finalId].image;
      this.desc = this.cities[this.finalId].desc;
      console.log("Ciudad: "+ this.imagen);
    });
  }
  
  getCities() {
    console.log('dentro de getCities - City');
    return this.http
    .get('../../assets/files/cities.json')
    .pipe(map((res: any) =>res.data ) );
  }


}
