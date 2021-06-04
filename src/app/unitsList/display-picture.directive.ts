import { Directive, ElementRef, HostListener,Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisplayPicture]'
})
export class DisplayPictureDirective {

@Input() displayPictureHover: string;
@Input() hiddenPicture: string;
private displayPicture = 'block';

  constructor(private el: ElementRef, private renderer: Renderer2) { 
  //  renderer.setStyle(el.nativeElement, 'display', this.hiddenPicture)
  }

onMouseEnter() {
    let displayPicture = this.el.nativeElement.querySelector('.test')
    this.renderer.setStyle(displayPicture, 'display', this.displayPicture)
  }
  
onMouseLeave() {
    let hiddenPicture = this.el.nativeElement.querySelector('.test')
    this.renderer.setStyle(hiddenPicture, 'display', this.hiddenPicture)
  }
}
