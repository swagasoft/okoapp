import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};


  constructor(private http: HttpClient) { }

  submitPagent(form){
    return this.http.post(environment.apiBaseUrl + '/submit-pagent', form);
  }

  getAllEvent(){
    return this.http.get(environment.apiBaseUrl +'/get-all-event');
  }

  submitEvent(event){
    return this.http.post(environment.apiBaseUrl + '/submit-event', event);
  }

  createContestTant(contestant){
    return this.http.post(environment.apiBaseUrl + '/create-contestant', contestant);
  }

  getAllContestant(id){
    return this.http.get(environment.apiBaseUrl + `/get-contestant${id}`)
  }

  submitVote(votes){
    return this.http.put(environment.apiBaseUrl + '/submit-vote', votes);
  }

  
}
