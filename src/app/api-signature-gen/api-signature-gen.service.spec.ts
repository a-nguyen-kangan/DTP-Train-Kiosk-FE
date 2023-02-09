import { TestBed } from '@angular/core/testing';

import { ApiSignatureGenService } from './api-signature-gen.service';

describe('ApiSignatureGenService', () => {
  let service: ApiSignatureGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSignatureGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
