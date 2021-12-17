import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFiltersComponent } from './tabs-filters.component';

describe('TabsFiltersComponent', () => {
  let component: TabsFiltersComponent;
  let fixture: ComponentFixture<TabsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
