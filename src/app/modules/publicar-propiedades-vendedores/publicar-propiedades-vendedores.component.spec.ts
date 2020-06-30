import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarPropiedadesVendedoresComponent } from './publicar-propiedades-vendedores.component';

describe('PublicarPropiedadesVendedoresComponent', () => {
  let component: PublicarPropiedadesVendedoresComponent;
  let fixture: ComponentFixture<PublicarPropiedadesVendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarPropiedadesVendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarPropiedadesVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
