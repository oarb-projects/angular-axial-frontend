import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorAgregarComponent } from './vendedor-agregar.component';

describe('VendedorAgregarComponent', () => {
  let component: VendedorAgregarComponent;
  let fixture: ComponentFixture<VendedorAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
