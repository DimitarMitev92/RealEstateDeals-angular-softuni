import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[screenSize]',
  exportAs: 'screenSize',
})
export class NavbarMenuTracker {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
      this.renderer.addClass(this.el.nativeElement, 'sm:block');
      this.renderer.removeClass(this.el.nativeElement, 'hidden');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'sm:block');
    }
  }
}
