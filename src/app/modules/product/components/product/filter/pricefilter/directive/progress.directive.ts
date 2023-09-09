import { Directive,ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit{
  @HostBinding('style.width') width!:string;
  @HostBinding('style.backgroundColor') backgroundColor!:string;

  constructor() { }

  ngOnInit(): void {
    this.backgroundColor='red';
    this.width='75%'
  }
  @HostListener('mouseover') 
  mouseover(event:Event){
    this.width='50%';
    this.backgroundColor='green';
  }


  @HostListener('mouseleave') 
  mouseleave(event:Event){
    this.width='75%';
    this.backgroundColor='red';
  }

}
