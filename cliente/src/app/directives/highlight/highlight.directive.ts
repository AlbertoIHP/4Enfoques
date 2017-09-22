import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';


@Directive({
	selector: '[myHighlight]'
})
export class HighlightDirective {


		constructor(public el: ElementRef, private _renderer: Renderer2) {
			 //el.nativeElement.style.backgroundColor = 'yellow';
			// this._renderer.setProperty(this.el.nativeElement, , 'my new content');
		this._renderer.setAttribute(this.el.nativeElement, 'class', 'tooltipped');
		this._renderer.setAttribute(this.el.nativeElement, 'data-position', 'top');
		this._renderer.setAttribute(this.el.nativeElement, 'data-delay', '10');
		this._renderer.setAttribute(this.el.nativeElement, 'materialize', 'tooltip');

		}
	@Input('myHighlight') highlightColor: string;




	@HostListener('mouseenter') onMouseEnter() {
		//this.highlight(this.highlightColor || 'red');
	 
	}

	@HostListener('mouseleave') onMouseLeave() {
		//this.highlight(null);
	}

	private highlight(color: string) {
		//this.el.nativeElement.style.backgroundColor = color;
	}

}
