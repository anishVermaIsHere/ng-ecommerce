import { Component, Directive, ElementRef, EventEmitter, OnInit, Output, Input, Renderer2, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/modules/product/services/filter.service';

@Component({
  selector: 'app-pricefilter',
  templateUrl: './pricefilter.component.html',
  styles: [`
  
   input[type=range] {
    width: 100%;
    height: 4px;
    position: absolute;
    z-index:25;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  input[type=range]::-webkit-slider-thumb {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    pointer-events: auto;
    cursor: pointer;
    background:#000;
    -webkit-appearance: none;
  }
 
  `]
})


export class PricefilterComponent implements OnInit{
  minVal=100;
  maxVal=10000;
  min=0;
  max=10000;
  step=100;
  priceDiff=500;
  @ViewChild('progress') progress!:ElementRef; 

  constructor(private renderer:Renderer2,private filterService:FilterService){}

  ngOnInit(){
    this.setProgress();
  }

  setProgress(){
    const progress=this.progress.nativeElement;
    this.renderer.setStyle(progress,'left',(this.minVal / this.max) * 100 + "%");
    this.renderer.setStyle(progress,'right',100-(this.maxVal / this.max) * 100 + "%");
  }

  handleMaxRange(event:Event){
    const target=event.target as HTMLInputElement;
    if (this.maxVal - this.minVal >= this.priceDiff && this.maxVal <= this.max) {
      if (parseInt(target.value) < this.minVal) {
      } else {
        this.maxVal=parseInt(target.value);
        this.setProgress();
      }
    } 
    else {
      if (parseInt(target.value) > this.maxVal) {
        this.maxVal=parseInt(target.value)-this.priceDiff;
        this.setProgress();
      }
    }
    this.filterProduct();

  }

  handleMinRange(event:Event){
    const target=event.target as HTMLInputElement;
    if (this.maxVal - this.minVal >= this.priceDiff && this.maxVal <= this.max) {
      if (parseInt(target.value) > this.maxVal) {
      } else {
        this.minVal=parseInt(target.value);
        this.setProgress();
      }
    } 
    else {
      if (parseInt(target.value) < this.minVal) {
        this.minVal=parseInt(target.value)+this.priceDiff;
        this.setProgress();
      }
    }
    this.filterProduct();
  }
  
  onMinChange(event:Event){
    const value=parseInt((event.target as HTMLInputElement).value);
    if(value>=this.min&&value<this.max-this.priceDiff){
      this.minVal=value;
    } 
    else {
      this.minVal=this.min;
    }
    this.setProgress();
    this.filterProduct();
  }
  onMaxChange(event:Event){
    const value=parseInt((event.target as HTMLInputElement).value);
    if(value<=this.max&&value>this.min+this.priceDiff){
      this.maxVal=value;
    }
    else if(value<=0||value>this.max){
      this.maxVal=this.max;
    }
     else {
      this.maxVal=this.max;
    }
    this.setProgress();
    this.filterProduct();
  }

  filterProduct(){
    this.filterService.handlePriceFilter(this.minVal,this.maxVal);    
  }
 
}
