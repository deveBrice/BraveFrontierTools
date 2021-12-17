import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationsFilterComponent } from './collaborations-filter.component';

describe('CollaborationsFilterComponent', () => {
  let component: CollaborationsFilterComponent;
  let fixture: ComponentFixture<CollaborationsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborationsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
