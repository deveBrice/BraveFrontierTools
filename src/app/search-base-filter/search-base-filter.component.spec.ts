import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBaseFilterComponent } from './search-base-filter.component';

describe('AdvancedSearchComponent', () => {
  let component: SearchBaseFilterComponent;
  let fixture: ComponentFixture<SearchBaseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBaseFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBaseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
