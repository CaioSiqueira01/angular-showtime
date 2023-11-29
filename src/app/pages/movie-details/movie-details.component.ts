import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private router:ActivatedRoute, private title:Title, private meta:Meta) {}

  getMovieDetailResult: any;
  getMovieVideoResult:any;
  getMovieCastResult: any;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getCast(getParamId);
  }

  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe(async(result)=>{
        this.getMovieDetailResult = await result;

        // updatetags
        this.title.setTitle(`${this.getMovieDetailResult.original_title}`);
        this.meta.updateTag({name:'title',content:this.getMovieDetailResult.original_title});
     
        // facebook
        this.meta.updateTag({property:'og:type',content:"website"});
        this.meta.updateTag({property:'og:url',content:``});
        this.meta.updateTag({property:'og:title',content:this.getMovieDetailResult.original_title});
        this.meta.updateTag({property:'og:description',content:this.getMovieDetailResult.overview});
        this.meta.updateTag({property:'og:image',content:`https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`});
    });
  }

  getVideo(id: string | null) {
    if (id) {
      this.service.getMovieVideos(id).subscribe((res: any) => {
        const trailer = res.results.find((video: any) => video.type === 'Trailer');
        if (trailer) {
          this.getMovieVideoResult = trailer.key;
        }
      });
    }
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe((res => {
      this.getMovieCastResult = res.cast;
    }))
  }
}
