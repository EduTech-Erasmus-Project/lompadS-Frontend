import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewxmlComponent } from './viewxml.component';

describe('ViewxmlComponent', () => {
  let component: ViewxmlComponent;
  let fixture: ComponentFixture<ViewxmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewxmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewxmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
