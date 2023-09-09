import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment} from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})

export class BreadcrumbComponent implements OnInit{
  breadcrumbList:{path:string;label:string}[]=[];
  constructor(private router:Router,private route:ActivatedRoute){}


  listenRoute(){
    this.router.events.subscribe((router:any)=>{
      let url=router.url;
      console.log('url',router.routerEvent)
    })
    console.log('dsd',this.route.url);
    this.route.url.subscribe((url:UrlSegment[])=>{
      console.log('data',url);
      url.map((path:any)=>{
        this.breadcrumbList.push({
          path:path.path,
          label:path.path.charAt(0).toUpperCase()+path.path.slice(1)
        });
      })
    })
  }

  ngOnInit(): void {
  // this.route.pathFromRoot;
  // this.listenRoute();
  // console.log('breadcrumbslist',this.breadcrumbList);

  }
}
