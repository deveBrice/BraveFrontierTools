import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollLoaderData]'
})
export class ScrollLoaderDataDirective {
  @Output() scrollingLimitReached = new EventEmitter<void>();

  emitted = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.emitted) {
      this.emitted = true;
      this.scrollingLimitReached.emit();
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
      this.emitted = false;
    }
  }
}