import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorFormComponent } from './vendedor-form.component';

describe('VendedorFormComponent', () => {
  let component: VendedorFormComponent;
  let fixture: ComponentFixture<VendedorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
