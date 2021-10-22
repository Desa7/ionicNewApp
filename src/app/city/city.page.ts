import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  id: any;
  name: string;
  image: string;
  description:string
  cities: any = [];
  finalId: number;

  constructor(private activatedRoute:ActivatedRoute,private httpClient: HttpClient,) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.finalId = this.id - 1;
    this.getCities().subscribe(res => {
      console.log("Res: ", res);
      this.cities = res;
      this.name = this.cities[this.finalId].name;
      this.image = this.cities[this.finalId].image;
      this.description = this.cities[this.finalId].description;
    })
  }

  getCities() {
    return this.httpClient
      .get("assets/files/cities.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }

}
