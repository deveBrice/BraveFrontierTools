import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSpecialFilterComponent } from './units-special-filter.component';

describe('UnitsSpecialFilterComponent', () => {
  let component: UnitsSpecialFilterComponent;
  let fixture: ComponentFixture<UnitsSpecialFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsSpecialFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsSpecialFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
