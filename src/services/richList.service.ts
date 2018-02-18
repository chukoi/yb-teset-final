/**
 * richList.service.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RichListService {
  /**
   * constructor
   *
   * @param {HttpClient} http
   * @return {null}
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve the page data for the celebrity list.
   *
   * @return {*} Either the data or an error.
   */
  public getData(): Observable<any> {
    return this.http.get('../assets/richList.json')
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(this.handleError(error)));
  }

  /**
   * Log what error occured if we couln't retrieve the data.
   *
   * @return {void}
   */
  private handleError(error: any): void {
    console.log(error);
  }
}
