import { Component, ElementRef,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  @Input() search!:ElementRef;
  constructor(private router:Router){}
  onKey(event:KeyboardEvent,element:HTMLInputElement){
    if(event.keyCode===13&&element.value!==''){
    this.router.navigate(['/products'],{ queryParams: { q: element.value.toLowerCase().trim() }});
    }
  }
  onSearch(element:HTMLInputElement){
    this.router.navigate(['/products?q='+element.value]);
  }
}
