import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  error: any;
  newRestaurant: any;
  ngOnInit() {
    this.newRestaurant = {name: "", cusine: ""}
  }

  restAdd(){
    let add = this._httpService.getAdd(this.newRestaurant);
    add.subscribe(data => {
      console.log(data)
      if(data['error']['code'] == 11000){
        this.error = data['error']['errmsg']
      }
      else if(data['message'] == 'Error'){
        this.error = data['error']['message']
      }
      else{
        this._router.navigate(['/home']);
      }
    })
  }

}
