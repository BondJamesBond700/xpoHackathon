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
import { Chain } from '../../base-entities/chain/chain';

@Injectable()
export class ChainService {

    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    constructor(private http: Http, private messageService : MessageService) {}

    /**
     * Get a Chain by id.
     */
    getChain(id : any) : Observable<Chain> {
        return this.http.get('/api/chains/' + id)
            .map(response => new Chain(response.json()))
            .catch(this.handleError);
    }

    /**
     * Update the passed chain.
     */
    update(chain : Chain) : Observable<Chain> {
        let body = JSON.stringify(chain);

        return this.http.put('/api/chains/', body, this.options)
            .map(response => new Chain(response.json()))
            .catch(this.handleError);
    }

    /**
     * Load a page (for paginated datatable) of Chain using the passed
     * chain as an example for the search by example facility.
     */
    getPage(chain : Chain, event :any) : Observable<PageResponse<Chain>> {
        let req = new PageRequestByExample(chain, event);
        let body = JSON.stringify(req);

        return this.http.post('/api/chains/page', body, this.options)
            .map(response => {
                let pr : any = response.json();
                return new PageResponse<Chain>(pr.totalPages, pr.totalElements, Chain.toArray(pr.content));
            })
            .catch(this.handleError);
    }

    /**
     * Performs a search by example on 1 attribute (defined on server side) and returns at most 10 results.
     * Used by ChainCompleteComponent.
     */
    complete(query : string) : Observable<Chain[]> {
        let body = JSON.stringify({'query': query, 'maxResults': 10});
        return this.http.post('/api/chains/complete', body, this.options)
            .map(response => Chain.toArray(response.json()))
            .catch(this.handleError);
    }

    /**
     * Delete an Chain by id.
     */
    delete(id : any) {
        return this.http.delete('/api/chains/' + id).catch(this.handleError);
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
