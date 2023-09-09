import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  brandlogo='https://www.pngkey.com/png/detail/361-3617936_b2b-e-commerce-b2b-e-commerce-icon.png';
  year=new Date().getFullYear();
  brand='Back 2 Buy';
}
