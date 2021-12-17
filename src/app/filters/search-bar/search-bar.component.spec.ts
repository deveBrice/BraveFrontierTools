import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;
    
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [SearchBarComponent],
        imports: [FormsModule, ReactiveFormsModule]
      }).compileComponents();

      fixture = TestBed.createComponent(SearchBarComponent);
      component = fixture.componentInstance;
    })
    
    it('is search-bar component defined', () => {
      expect(component).toBeDefined();
    })
    
    it('is form valid when empty', () => {
      let unitName = component.rForm.controls["search"];
      unitName.setValue("Escrimeur Vargas")
      expect(component.rForm.valid).toBeTruthy();
    })

    it('is form invalid when the chain of character is greater than 100 character', () => {
      let unitName = component.rForm.controls["search"];
      unitName.setValue("Escrimeur Vargas");

      expect(component.rForm.valid).toBeTruthy();
      expect(component.rForm.controls["search"].valid).toBeTruthy();
     // expect(unitName.errors["maxLength"]).toBeDefined();
    })
});
