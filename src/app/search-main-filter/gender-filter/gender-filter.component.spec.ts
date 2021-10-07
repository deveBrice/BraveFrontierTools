import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderFilterComponent } from './gender-filter.component';

describe('GenderFilterComponent', () => {
  let component: GenderFilterComponent;
  let fixture: ComponentFixture<GenderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
