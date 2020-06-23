import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEditarComponent } from './inventario-editar.component';

describe('InventarioEditarComponent', () => {
  let component: InventarioEditarComponent;
  let fixture: ComponentFixture<InventarioEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
