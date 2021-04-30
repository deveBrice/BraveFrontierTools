import { StaticReflector } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LevelSearchComponent } from './level-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

describe('LevelSearchComponent', () => {
  let component: LevelSearchComponent;
  let fixture: ComponentFixture<LevelSearchComponent>;
  let starEl: DebugElement;
  let dom;
  let button;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelSearchComponent ],
      imports: [BrowserAnimationsModule, MatIconModule, MatButtonModule, MatDividerModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   // starEl = fixture.debugElement;
   /* dom = fixture.nativeElement;
    button = dom.querySelector('#test');*/
  });

  it('checked if event click is present on the button', async() => {  
    spyOn(component, 'selectedLevel')

     fixture.debugElement.query(By.css('button')).nativeElement.click();

     expect(component.selectedLevel).toHaveBeenCalled();
  });

  it('selected star', async() => {   
     starEl = fixture.debugElement.query(By.css('#star_border')).nativeElement;
    // expect(starEl).toBeFalsy();

     component.selectedLevel(component.levelList.filter((res) => {res.state === true})); 
     starEl = fixture.debugElement.query(By.css('#star')).nativeElement;
     expect(starEl).toBeTruthy()
   });  
});
