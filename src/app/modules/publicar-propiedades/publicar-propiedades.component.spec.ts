import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarPropiedadesComponent } from './publicar-propiedades.component';

describe('PublicarPropiedadesComponent', () => {
  let component: PublicarPropiedadesComponent;
  let fixture: ComponentFixture<PublicarPropiedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarPropiedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
