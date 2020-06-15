import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorListadoComponent } from './vendedor-listado.component';

describe('VendedorListadoComponent', () => {
  let component: VendedorListadoComponent;
  let fixture: ComponentFixture<VendedorListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
