import { TestBed } from '@angular/core/testing';

import { CrudstudentService } from './crudstudent.service';

describe('CrudstudentService', () => {
  let service: CrudstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
