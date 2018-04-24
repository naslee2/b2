import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  dataId: any;
  newReview: any;
  error: any;
  ngOnInit() {
    this.dataId = this._httpService.data;
    this.newReview = {_id: this.dataId._id, review: "", customer: "", star: 0};
    console.log(this.dataId)
  }

  reviewAdd(){
    let obs = this._httpService.newReview(this.newReview);
    obs.subscribe(data =>{
      if(data['message'] == 'Error'){
        this.error = "Invalid Name"
        console.log("error")
      }
      else{
        this._router.navigate(['/reviews/'+this.dataId._id]);
      }
    })

  }

}
