import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialAttackSearchComponent } from './special-attack-search.component';

describe('SpecialAttackSearchComponent', () => {
  let component: SpecialAttackSearchComponent;
  let fixture: ComponentFixture<SpecialAttackSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialAttackSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialAttackSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
