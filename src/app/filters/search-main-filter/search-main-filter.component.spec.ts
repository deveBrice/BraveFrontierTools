import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainFilterComponent } from './search-main-filter.component';

describe('AdvancedSearchComponent', () => {
  let component: SearchMainFilterComponent;
  let fixture: ComponentFixture<SearchMainFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMainFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
