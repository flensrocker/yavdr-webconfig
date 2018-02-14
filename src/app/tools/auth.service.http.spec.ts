import { TestBed, inject } from '@angular/core/testing';

import { AuthServiceHttp } from './auth.service.http';

describe('AuthServiceHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceHttp]
    });
  });

  it('should be created', inject([AuthServiceHttp], (service: AuthServiceHttp) => {
    expect(service).toBeTruthy();
  }));
});
