import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { match_table } from './data/MatchTable';


@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      console.log('-> HttpRequest :: URL', request.url);
      console.log('-> HttpRequest :: request', request);

      // /match-table
      if (request.url.match(/match-table$/) && request.method === 'POST') {
        const r = {
          pipelineID: request.body['pipelineID'],
          timestamp: Date.now(),
          match_table: match_table
        };
        console.log('<- HttpRequest :: matchTablePost',r);
        return of(new HttpResponse(
          { status: 200, body: r }
        ));
      }

        // pass through any requests not handled above
        return next.handle(request);

    }))

      // call materialize and dematerialize to ensure delay even if an error is thrown
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
