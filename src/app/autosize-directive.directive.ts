import { Directive, Host, HostListener, Renderer2 } from '@angular/core';
import { MatSelect } from '@angular/material/select';


@Directive({
  selector: '[autosize]'
})
export class AutosizeDirectiveDirective {
  @HostListener("openedChange", ["$event"])
  changeHeight(event: any) {
    if (event) {
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.renderer.setStyle(
        this.select.panel.nativeElement,
        "max-height",
         (height +40 -this.select.panel.nativeElement.getBoundingClientRect().y) +"px");
    }
  }

  constructor(@Host() private select: MatSelect, private renderer: Renderer2) { }

}
