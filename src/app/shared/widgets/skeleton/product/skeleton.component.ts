import { Component } from "@angular/core";

@Component({
    selector:'app-skeleton',
    templateUrl:'skeleton.component.html',
    styles:[]
})

export class SkeletonComponent {
    asideSkeletons:number[]=[...new Array(3)];
    prodSkeletons:number[]=[...new Array(12)];
    constructor(){}


}