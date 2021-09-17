import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecicleComponent } from './livecicle.component';

describe('LivecicleComponent', () => {
  let component: LivecicleComponent;
  let fixture: ComponentFixture<LivecicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivecicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
