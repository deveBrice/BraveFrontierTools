import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsSearchComponent } from './elements-search.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DebugElement } from '@angular/core';

fdescribe('ElementsSearchComponent', () => {
  let component: ElementsSearchComponent;
  let fixture: ComponentFixture<ElementsSearchComponent>;
  let state: DebugElement;
  let st: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsSearchComponent ],
      imports: [BrowserAnimationsModule, MatCheckboxModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should watch if all the checkbox of component are checked by default', () => {
    state = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(state).toBeTruthy();
  });
});
