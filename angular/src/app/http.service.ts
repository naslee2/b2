import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  data: any;
  constructor(private _http: HttpClient) { }
  getAdd(x){
    return this._http.post('/new', {name: x.name, cusine: x.cusine});
  }

  getAll(){
    return this._http.get('/getAll');
  }

  getReviews(detail){
    console.log(detail)
    return this._http.get('/getQuotes/'+detail._id);
  }

  deleteRest(rest){
    return this._http.delete('/delete/'+rest._id);
  }

  newReview(data){
    console.log("service",data)
    return this._http.put('/newReview/'+data._id, data);
  }
}
