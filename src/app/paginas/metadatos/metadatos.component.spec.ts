import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadatosComponent } from './metadatos.component';

describe('MetadatosComponent', () => {
  let component: MetadatosComponent;
  let fixture: ComponentFixture<MetadatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
