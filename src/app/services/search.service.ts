import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";

@Injectable()
export class SearchService {
	constructor(private http: HttpClient) { }

    getHTTPHeaders(): HttpHeaders {
		const result = new HttpHeaders();
		result.set('Content-Type', 'application/json');
		return result;
	}

    searchForResult(search: SearchModel, pageNumber, pageSize = 3): Observable<any> {
        const httpHeader = this.getHTTPHeaders();
        const API_GET_SEARCH_RESULT = 'http://localhost:9000/api/freights';
        let pickup_date = search.pickupDate['day']+'.'+ search.pickupDate['month']+'.'+ search.pickupDate['year'];
		return this.http.get(API_GET_SEARCH_RESULT, {
            params: new HttpParams()
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber)
                .set('pageSize', pageSize.toString())
                .set('origin', search.originCountry)
                .set('destination', search.destinationCountry)
                .set('pickup_date', pickup_date.toString())
                .set('sea', search.sea)
                .set('air', search.air)
                .set('land', search.land)
        });
	}


}