import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  reviewId: any;
  error: any;
  review: any;
  ngOnInit() {
    this.review = this._httpService.data['review'];
    this.reviewId = this._httpService.data;
    console.log('bob',this.reviewId)
    this.getRev()
  }

  getRev(){
    let obs = this._httpService.getReviews(this.reviewId);
    obs.subscribe(data =>{
      this.reviewId = data;
    })

  }
}
