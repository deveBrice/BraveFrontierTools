import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsListComponent } from './unitsList.component';

describe('UnitsComponent', () => {
  let component: UnitsListComponent;
  let fixture: ComponentFixture<UnitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
