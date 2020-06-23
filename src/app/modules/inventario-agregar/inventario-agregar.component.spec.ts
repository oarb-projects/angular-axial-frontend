import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAgregarComponent } from './inventario-agregar.component';

describe('InventarioAgregarComponent', () => {
  let component: InventarioAgregarComponent;
  let fixture: ComponentFixture<InventarioAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
