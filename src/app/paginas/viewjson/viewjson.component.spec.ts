import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjsonComponent } from './viewjson.component';

describe('ViewjsonComponent', () => {
  let component: ViewjsonComponent;
  let fixture: ComponentFixture<ViewjsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewjsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
