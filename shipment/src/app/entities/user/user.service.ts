//
// Copyright © 2016-2017 Infosys Limited, Bangalore, India. All Rights Reserved.
// * Except for any open source software components embedded in this
// * Infosys proprietary software program (Program), this Program is protected
// * by copyright laws, international treaties and other pending or existing
// * intellectual property rights in India, the United States and other countries.
// * Except as expressly permitted, any unauthorized reproduction, storage,
// * transmission in any form or by any means (including without limitation
// * electronic, mechanical, printing, photocopying, recording or otherwise),
// * or any distribution of this Program, or any portion of it,
// * may result in severe civil and criminal penalties, and
// * will be prosecuted to the maximum extent possible under the law.
// Template pack-angular:web/src/app/entities/entity.service.ts.e.vm
//
import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../service/message.service';
import { PageResponse, PageRequestByExample } from '../../support/paging';
import { User } from '../../base-entities/user/user';

@Injectable()
export class UserService {

    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    constructor(private http: Http, private messageService : MessageService) {}

    /**
     * Get a User by id.
     */
    getUser(id : any) : Observable<User> {
        return this.http.get('/api/users/' + id)
            .map(response => new User(response.json()))
            .catch(this.handleError);
    }

    /**
     * Update the passed user.
     */
    update(user : User) : Observable<User> {
        let body = JSON.stringify(user);

        return this.http.put('/api/users/', body, this.options)
            .map(response => new User(response.json()))
            .catch(this.handleError);
    }

    /**
     * Load a page (for paginated datatable) of User using the passed
     * user as an example for the search by example facility.
     */
    getPage(user : User, event :any) : Observable<PageResponse<User>> {
        let req = new PageRequestByExample(user, event);
        let body = JSON.stringify(req);

        return this.http.post('/api/users/page', body, this.options)
            .map(response => {
                let pr : any = response.json();
                return new PageResponse<User>(pr.totalPages, pr.totalElements, User.toArray(pr.content));
            })
            .catch(this.handleError);
    }

    /**
     * Performs a search by example on 1 attribute (defined on server side) and returns at most 10 results.
     * Used by UserCompleteComponent.
     */
    complete(query : string) : Observable<User[]> {
        let body = JSON.stringify({'query': query, 'maxResults': 10});
        return this.http.post('/api/users/complete', body, this.options)
            .map(response => User.toArray(response.json()))
            .catch(this.handleError);
    }

    /**
     * Delete an User by id.
     */
    delete(id : any) {
        return this.http.delete('/api/users/' + id).catch(this.handleError);
    }

    // sample method from angular doc
    private handleError (error: any) {
        // TODO: seems we cannot use messageService from here...
        let errMsg = (error.message) ? error.message :
        error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        if (error.status === 401 ) {
            window.location.href = '/';
        }
        return Observable.throw(errMsg);
    }
}
