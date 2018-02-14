import { TestBed, inject } from '@angular/core/testing';

import { AuthServiceMock } from './auth.service.mock';

describe('AuthServiceMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceMock]
    });
  });

  it('should be created', inject([AuthServiceMock], (service: AuthServiceMock) => {
    expect(service).toBeTruthy();
  }));
});
