import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Data } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styles: [
  ]
})
export class Page404Component implements OnInit{
  errorMessage!:string;
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
      this.errorMessage=this.route.snapshot.data['message'];
      this.route.data.subscribe((data:Data)=>{
          this.errorMessage=data['message'];
      })
  }
}
