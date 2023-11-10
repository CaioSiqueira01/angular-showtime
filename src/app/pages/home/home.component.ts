import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: MovieApiServiceService) {}

  bannerResult: any = [];

  ngOnInit(): void {
    this.bannerData();
  }

  //Bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((res) => {
      this.bannerResult = res.results;
      console.log(this.bannerResult);
    })
  }

}
