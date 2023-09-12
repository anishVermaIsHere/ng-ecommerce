import { NgModule } from "@angular/core";
import { SkeletonComponent } from "./widgets/skeleton/product/skeleton.component";
import { CardskeletonComponent } from "./widgets/skeleton/cardskeleton/cardskeleton.component";
import { AsideskeletonComponent } from "./widgets/skeleton/asideskeleton/asideskeleton.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        CardskeletonComponent,
        AsideskeletonComponent,
        SkeletonComponent
    ],
    imports:[
        CommonModule
    ],
    providers:[],
    exports:[
        CardskeletonComponent,
        AsideskeletonComponent,
        SkeletonComponent
    ]
})

export class SharedModule {}