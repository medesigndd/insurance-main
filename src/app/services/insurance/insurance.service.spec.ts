/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InsuranceService } from './insurance.service';

describe('Service: Insurance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceService]
    });
  });

  it('should ...', inject([InsuranceService], (service: InsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
