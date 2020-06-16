import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorEditarComponent } from './vendedor-editar.component';

describe('VendedorEditarComponent', () => {
  let component: VendedorEditarComponent;
  let fixture: ComponentFixture<VendedorEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
