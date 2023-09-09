import { Component, Input,OnInit, ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styles: [
  ]
})
export class CarouselComponent implements OnInit{
  @Input() slideImages!:string[];
  @ViewChild('sliderRef') sliderRef!:ElementRef;
  constructor(){
  }
  selectedSlide=0;

  selectSlide(index:number|any){
    this.selectedSlide = index;
  }
  onPrev(){
    let width=this.sliderRef.nativeElement.clientWidth;
    this.sliderRef.nativeElement.scrollLeft=this.sliderRef.nativeElement.scrollLeft-width;
  }
  onNext(){
    let width=this.sliderRef.nativeElement.clientWidth;
    this.sliderRef.nativeElement.scrollLeft=this.sliderRef.nativeElement.scrollLeft+width;
  }
  ngOnInit(): void {
  }
  
}
