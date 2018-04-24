import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allRestaraunts: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.showRestHome()
  }

  showRestHome(){
    let x = this._httpService.getAll();
    x.subscribe(data =>{
      console.log("Home Data",data);
      this.allRestaraunts = data['data'];
    })
  }

  restDelete(x){
    let obs = this._httpService.deleteRest(x);
    obs.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = "Invalid Resturant"
        console.log("error")
      }
      else{
        console.log("successful delete")
        this.showRestHome()
      }
    })
  }

  restReviews(x){
    this._httpService.data = x;
    this._router.navigate(['/reviews/'+x['_id']])
  }

  restUpdate(x){
    this._httpService.data = x;
    this._router.navigate(['/edit/'+x['_id']])   
  }

}
