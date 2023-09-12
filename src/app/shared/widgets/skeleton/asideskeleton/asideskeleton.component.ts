import { Component } from '@angular/core';

@Component({
  selector: 'app-asideskeleton',
  template: `
    <div class=" mb-5">
        <h3 class="text-sm font-semibold uppercase ml-3 mb-3 py-3"></h3>
        <div class="h-3 bg-gray-200  dark:bg-gray-700 w-32 mb-2"></div>
        <div class="h-2 bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div class="h-2.5 bg-gray-200  dark:bg-gray-700 w-32 mb-2"></div>
        <div class="w-48 h-2 bg-gray-200  dark:bg-gray-700"></div>
        
        <span class="sr-only">Loading...</span>
    </div>
  `,
  styles: [
  ]
})
export class AsideskeletonComponent {
  skeletons:number[]=[...new Array(3)];

}
