import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoeducativoComponent } from './usoeducativo.component';

describe('UsoeducativoComponent', () => {
  let component: UsoeducativoComponent;
  let fixture: ComponentFixture<UsoeducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsoeducativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsoeducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
