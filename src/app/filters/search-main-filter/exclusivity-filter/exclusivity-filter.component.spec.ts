import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusivityFilterComponent } from './exclusivity-filter.component';

describe('ExclusivityFilterComponent', () => {
  let component: ExclusivityFilterComponent;
  let fixture: ComponentFixture<ExclusivityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusivityFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusivityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
