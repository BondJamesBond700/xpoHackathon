import { Injectable } from '@angular/core';
import { HttpModule, RequestOptions, Headers, Http } from '@angular/http';

import { User } from '../../../base-entities/user/user';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
private headers;
  private baseUrl: string;
loggedInUserDetails={'name':''};
private loggedInUser = new BehaviorSubject<{'name':String}>(null);
  loggedInUserStream$ = this.loggedInUser.asObservable();



   constructor(private http: Http) {
    this.baseUrl = environment.serverProtocol + '://'
      + environment.serverName + ':'
      + environment.serverPort;
  }

  public authenticateUser(user: Object) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    let url = this.baseUrl + '/bcf/identity-mgmt/login';
    return this.http.post(url, JSON.stringify(user), { headers: this.headers })
      .map((res) => res.json()).catch(this.handleError);

  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  userDetails(user) {
    console.log(user);
    if (user) {
      let loggedUser = {'name':''};
      // var loginDetails = JSON.parse(user);
      loggedUser['name'] = user;
      // console.log(loginDetails)
      this.loggedInUserDetails = loggedUser;
      this.loggedInUser.next(this.loggedInUserDetails);
    } else {
      this.loggedInUserDetails = null;
      this.loggedInUser.next(this.loggedInUserDetails);
    }

  }

}
