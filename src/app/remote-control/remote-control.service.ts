import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HitkeyRequest, HitkeyResponse, HitkeysRequest, HitkeysResponse } from '../../api';
export { HitkeyRequest, HitkeyResponse, HitkeysRequest, HitkeysResponse };
export { KeyName } from '../../api';

@Injectable()
export class RemoteControlService {
  constructor(private _http: HttpClient) {
  }

  hitkey(request: HitkeyRequest): Observable<HitkeyResponse> {
    return this._http.post<HitkeyResponse>('/api/hitkey', request);
  }

  hitkeys(request: HitkeysRequest): Observable<HitkeysResponse> {
    return this._http.post<HitkeysResponse>('/api/hitkeys', request);
  }
}
