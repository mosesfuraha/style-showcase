import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements AfterViewInit {
  @Input() appLazyLoad!: string;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    const imgElement = this.el.nativeElement;

    this.renderer.addClass(imgElement, 'loading');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imgElement.src = this.appLazyLoad;

          imgElement.onload = () => {
            this.renderer.removeClass(imgElement, 'loading');
          };

          observer.unobserve(imgElement);
        }
      });
    });

    observer.observe(imgElement);
  }
}
