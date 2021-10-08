import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionFilterComponent } from './direction-filter.component';

describe('DirectionFilterComponent', () => {
  let component: DirectionFilterComponent;
  let fixture: ComponentFixture<DirectionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
