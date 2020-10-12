import { TestBed } from '@angular/core/testing';

import { NgWorkerbeeService } from './ng-workerbee.service';

describe('NgWorkerbeeService', () => {
  let service: NgWorkerbeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWorkerbeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
