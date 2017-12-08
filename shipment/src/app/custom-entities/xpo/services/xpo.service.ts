import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpModule, RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ProducerService {
  private baseUrl: string;
  private headers;

  constructor(private http: Http) {
    this.baseUrl = environment.serverProtocol + '://'
      + environment.serverName + ':'
      + environment.serverPort;
  }



  getChainInfo() {
    let url = this.baseUrl + "/bcf/bc-mgmt/chains/energytrading";
    return this.http.get(url)//, options)
      .map((res) => res.json()).catch(this.handleError);

  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}