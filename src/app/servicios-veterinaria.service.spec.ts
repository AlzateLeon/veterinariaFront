import { TestBed } from '@angular/core/testing';

import { ServiciosVeterinariaService } from './servicios-veterinaria.service';

describe('ServiciosVeterinariaService', () => {
  let service: ServiciosVeterinariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosVeterinariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
