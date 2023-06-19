import { TestBed } from '@angular/core/testing';

import { ProjectMockService } from './project-mock.service';

describe('ProjectMockService', () => {
  let service: ProjectMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
