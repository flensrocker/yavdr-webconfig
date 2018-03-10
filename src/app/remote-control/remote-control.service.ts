import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HitkeyRequest, HitkeyResponse, HitkeysRequest, HitkeysResponse } from '../../api';
export { HitkeyRequest, HitkeyResponse, HitkeysRequest, HitkeysResponse };
export { KeyName } from '../../api';

@Injectable()
export class RemoteControlService {
  constructor(private _http: HttpClient) {
  }

  hitkey(request: HitkeyRequest): Observable<HitkeyResponse> {
    const hitkeySubject: Subject<HitkeyResponse> = new Subject<HitkeyResponse>();
    this._http.post<HitkeyResponse>('/api/hitkey', request)
      .subscribe((response: HitkeyResponse) => {
        hitkeySubject.next(response);
      }, (err: any) => {
        hitkeySubject.error(err);
      }, () => {
        hitkeySubject.complete();
      });
    return hitkeySubject.asObservable();
  }

  hitkeys(request: HitkeysRequest): Observable<HitkeysResponse> {
    const hitkeysSubject: Subject<HitkeysResponse> = new Subject<HitkeysResponse>();
    this._http.post<HitkeysResponse>('/api/hitkeys', request)
      .subscribe((response: HitkeysResponse) => {
        hitkeysSubject.next(response);
      }, (err: any) => {
        hitkeysSubject.error(err);
      }, () => {
        hitkeysSubject.complete();
      });
    return hitkeysSubject.asObservable();
  }
}
