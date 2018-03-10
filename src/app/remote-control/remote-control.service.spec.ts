import { TestBed, inject } from '@angular/core/testing';

import { RemoteControlService } from './remote-control.service';

describe('RemoteControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteControlService]
    });
  });

  it('should be created', inject([RemoteControlService], (service: RemoteControlService) => {
    expect(service).toBeTruthy();
  }));
});
